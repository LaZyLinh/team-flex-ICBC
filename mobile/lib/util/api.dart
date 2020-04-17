import 'dart:convert';

import 'package:FlexWork/models/availability.dart';
import 'package:FlexWork/models/booking.dart';
import 'package:FlexWork/models/package.dart';
import 'package:FlexWork/models/user.dart';
import 'package:http/http.dart' as http;

const String BASE_URL = 'https://icbcflexwork.me:8080';

Future<http.Response> _post(String endpoint, dynamic body) {
  return http.post(BASE_URL + endpoint, body: body);
}

Future<http.Response> _get(String endpoint) {
  return http.get(BASE_URL + endpoint);
}

Future<http.Response> _delete(String endpoint) {
  return http.delete(BASE_URL + endpoint);
}

// User ---------------------------------------------------------------

Future<User> login(String email) async {
  email = email.trim().toLowerCase();
  final response = await _post('/auth/user', {'Email': email});
  final parsedResponse = json.decode(response.body);
  final staffId = parsedResponse['StaffId'];
  if (staffId == null) {
    throw "No staff Id!";
  }

  final workspaceId = parsedResponse['WorkspaceId'];
  if (workspaceId != null) {
    return User(
        email: email,
        staffId: staffId,
        hasWorkspace: true,
        workspaceId: workspaceId);
  } else
    return User(email: email, staffId: parsedResponse['StaffId']);
}

// My Bookings --------------------------------------------------------

deleteBooking(int bookingId) async {
  await _delete('/bookings/$bookingId');
}

Future<List<Booking>> bookings(int staffId) async {
  final response = await _get('/bookings/simple?staffId=$staffId');
  final parsedResponse = json.decode(response.body);
  final bookings = List<Booking>();
  (parsedResponse as List<dynamic>).forEach((b) {
    bookings.add(Booking(
      bookingId: b['bookingId'],
      workspaceId: b['workspaceId'],
      floorId: b['floorId'],
      startDate: DateTime.parse(b['startDate']),
      endDate: DateTime.parse(b['endDate']),
      city: b['city'],
      building: b['building'],
      ownerStaffId: b['ownerStaffId'],
      ownerFirstName: b['ownerFirstName'],
      ownerLastName: b['ownerLastName'],
      ownerEmail: b['ownerEmail'],
    ));
  });
  bookings.sort((b1, b2) {
    return b1.startDate.compareTo(b2.startDate);
  });
  return bookings;
}

// Lend Office -----------------------------------------------------------

makeAvailability(String workspaceId, String startDate, String endDate) async {
  final response = await _post("/availabilities",
      {"workspaceId": workspaceId, "startDate": startDate, "endDate": endDate});
  final parsedResponse = json.decode(response.body);
  final availabilityId = parsedResponse[0]['AvailabilityId'];
  return availabilityId;
}

getLendings({int staffId}) async {
  final response = await _get("/availabilities/owner?id=$staffId");
  final parsedResponse = json.decode(response.body);
  final lendings = List<Availability>();
  (parsedResponse as List<dynamic>).forEach((a) {
    lendings.add(Availability(
      a['AvailabilityId'],
      DateTime.parse(a['StartDate'].substring(0, 10)),
      DateTime.parse(a['EndDate'].substring(0, 10)),
    ));
  });
  lendings.sort((lend1, lend2) => lend1.startDate.compareTo(lend2.startDate));
  return lendings;
}

cancelAvailability(int availabilityId) async {
  await _delete("/availabilities/$availabilityId");
}

// Book Office

Future<List<Package>> getPackages(DateTime startDate, DateTime endDate,
    List<int> floorIds, List<int> features) async {
  final startDateStr = startDate.toString().substring(0, 10);
  final endDateStr = endDate.toString().substring(0, 10);
  var url = "/packages?startDate=$startDateStr&endDate=$endDateStr";
  floorIds.forEach((floorId) => url += "&floorIds=$floorId");
  features.forEach((featureId) => url += "&features=$featureId");
  final response = await _get(url);
  final parsedResponse = json.decode(response.body);
  final packages = <Package>[];

  (parsedResponse as List).forEach(
    (package) {
      final packageType = (package as List).length == 1
          ? PackageType.SingleAvailability
          : PackageType.MultiAvailability;
      final bookingSuggestions = <BookingSuggestion>[];
      package.forEach(
        (rawBookingSuggestion) {
          final DateTime startDate =
              DateTime.parse(rawBookingSuggestion['startDate']);
          final DateTime endDate =
              DateTime.parse(rawBookingSuggestion['endDate']);
          bookingSuggestions.add(
            BookingSuggestion(
                rawBookingSuggestion['availabilityId'],
                startDate,
                endDate,
                rawBookingSuggestion['workspaceId'],
                rawBookingSuggestion['comment'],
                rawBookingSuggestion['floor']['floorNo'],
                rawBookingSuggestion['floor']['building'],
                rawBookingSuggestion['floor']['city'],
                rawBookingSuggestion['floor']['floorId']),
          );
        },
      );
      packages.add(Package(packageType, bookingSuggestions));
    },
  );

  return packages;
}

Future<int> lockSingleBooking(
    BookingSuggestion bookingSuggestion, int staffId) async {
  final response = await _post('/lockWorkspace', {
    'staffId': staffId.toString(),
    'startDate': bookingSuggestion.startDate.toString().substring(0, 10),
    'endDate': bookingSuggestion.endDate.toString().substring(0, 10),
    'availabilityId': bookingSuggestion.availabilityId.toString(),
  });
  return (json.decode(response.body))['bookingId'];
}

Future<List<int>> lockMultipleBookings(
    List<BookingSuggestion> bookingSuggestions, int staffId) async {
  final successfullyLockedBookingIds = <int>[];
  for (final bookingSuggestion in bookingSuggestions) {
    try {
      final bookingId = await lockSingleBooking(bookingSuggestion, staffId);
      successfullyLockedBookingIds.add(bookingId);
    } catch (err) {
      unlockBookings(successfullyLockedBookingIds);
      throw err;
    }
  }
  return successfullyLockedBookingIds;
}

Future<List<int>> lockPackage(Package package, int staffId) async {
  if (package.type == PackageType.SingleAvailability) {
    return [await lockSingleBooking(package.bookingSuggestions[0], staffId)];
  } else {
    return await lockMultipleBookings(package.bookingSuggestions, staffId);
  }
}

Future<void> confirmBookings(List<int> bookingIds) async {
  try {
    for (final bookingId in bookingIds) {
      await _post('/bookings', {'bookingId': bookingId.toString()});
    }
  } catch (err) {
    unlockBookings(bookingIds);
    throw err;
  }
}

void unlockBookings(List<int> bookingIds) {
  bookingIds.forEach((bookingId) => _delete('/lockWorkspace/$bookingId'));
}

Future<Map> locationsAndFeatures() async {
  // Get features
  final featureMapResponse = await _get("/featuremap");
  final Map featureMap = json.decode(featureMapResponse.body);
  final featuresList = <Feature>[];
  featureMap.forEach((featureName, featureId) {
    featuresList.add(Feature(featureName, featureId));
  });
  // Get locations and floors
  final floorsResponse = await _get("/floors");
  final List floors = json.decode(floorsResponse.body);
  final Map<String, List<Floor>> locationsMap = {};
  floors.forEach((f) {
    final floorName = '${f['prefix']} Floor ${f['floorNo']}';
    final floorId = f['floorId'];
    final city = f['city'];
    if (locationsMap[city] == null) {
      locationsMap[city] = <Floor>[Floor(floorId, floorName)];
    } else {
      locationsMap[city].add(Floor(floorId, floorName));
    }
  });
  return {'locations': locationsMap, 'features': featuresList};
}
