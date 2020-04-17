import 'package:FlexWork/models/booking.dart';
import 'package:FlexWork/models/package.dart';
import 'package:FlexWork/util/api.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// EVENT ---------------------------------------------------------------------------
abstract class BookOfficeEvent {}

class BookOfficeStarted extends BookOfficeEvent {
  final int staffId;
  final List<Booking> upcomingBookings;

  BookOfficeStarted({@required this.staffId, @required this.upcomingBookings});
}

class UserAppliedFilter extends BookOfficeEvent {
  final DateTime startDate;
  final DateTime endDate;
  final List<int> floorIds;
  final List<int> features;

  UserAppliedFilter(
      {@required this.startDate,
      @required this.endDate,
      @required this.floorIds,
      @required this.features});
}

class UserLockedPackage extends BookOfficeEvent {
  final Package package;

  UserLockedPackage(this.package);
}

class UserConfirmedPackage extends BookOfficeEvent {
  final List<int> bookingIds;

  UserConfirmedPackage(this.bookingIds);
}

class UserUnlockedPackage extends BookOfficeEvent {
  final List<int> bookingIds;

  UserUnlockedPackage(this.bookingIds);
}

// STATE ---------------------------------------------------------------------------
abstract class BookOfficeState {}

class BookOfficeUninitialized extends BookOfficeState {}

class BookOfficeFetchLocationsAndFeaturesInProgress extends BookOfficeState {}

class BookOfficeInitialized extends BookOfficeState {
  final List<Booking> bookings;
  final Map<String, List<Floor>> locations;
  final List<Feature> features;

  BookOfficeInitialized(
      {@required this.bookings,
      @required this.locations,
      @required this.features});
}

class BookOfficeInitializationFailure extends BookOfficeState {}

// Listen for this
class FetchPackagesInProgress extends BookOfficeState {}

class FetchPackagesFailure extends BookOfficeState {}

class FetchPackagesSuccess extends BookOfficeState {
  final List<Package> packages;

  FetchPackagesSuccess(this.packages);
}

class LockPackageInProgress extends BookOfficeState {}

class LockPackageFailure extends BookOfficeState {}

class LockPackageSuccess extends BookOfficeState {
  final List<int> bookingIds;

  LockPackageSuccess(this.bookingIds);
}

class ConfirmPackageInProgress extends BookOfficeState {}

class ConfirmPackageFailure extends BookOfficeState {}

class ConfirmPackageSuccess extends BookOfficeState {
  final List<Feature> features;
  final Map<String, List<Floor>> locations;

  ConfirmPackageSuccess(this.features, this.locations);
}

class UnlockPackageSuccess extends BookOfficeState {}

class UnlockPackageFailure extends BookOfficeState {}

class UnlockPackageInProgress extends BookOfficeState {}

// BLOC ---------------------------------------------------------------------------
class BookOfficeBloc extends Bloc<BookOfficeEvent, BookOfficeState> {
  List<Booking> upcomingBookings;
  int staffId;
  List<Feature> features;
  Map<String, List<Floor>> locations;

  @override
  BookOfficeState get initialState => BookOfficeUninitialized();

  @override
  Stream<BookOfficeState> mapEventToState(BookOfficeEvent event) async* {
    if (event is BookOfficeStarted) {
      if (staffId != null) {
        return;
      }
      upcomingBookings = event.upcomingBookings;
      staffId = event.staffId;
      yield BookOfficeFetchLocationsAndFeaturesInProgress();
      try {
        final Map locsAndFeatures = await locationsAndFeatures();
        features = locsAndFeatures["features"];
        locations = locsAndFeatures["locations"];
        // Form will be built from this
        yield BookOfficeInitialized(
            bookings: upcomingBookings,
            locations: locations,
            features: features);
      } catch (err) {
        yield BookOfficeInitializationFailure();
      }
    }

    if (event is UserAppliedFilter) {
      yield FetchPackagesInProgress();
      try {
        final packages = await getPackages(
            event.startDate, event.endDate, event.floorIds, event.features);
        yield FetchPackagesSuccess(packages);
      } catch (err) {
        yield FetchPackagesFailure();
      }
    }

    if (event is UserLockedPackage) {
      yield LockPackageInProgress();
      try {
        final package = event.package;
        final List<int> bookingIds = await lockPackage(package, staffId);
        yield LockPackageSuccess(bookingIds);
      } catch (err) {
        print(err);
        yield LockPackageFailure();
      }
    }

    if (event is UserConfirmedPackage) {
      yield ConfirmPackageInProgress();
      try {
        final bookingIds = event.bookingIds;
        await confirmBookings(bookingIds);
        yield ConfirmPackageSuccess(features, locations);
      } catch (err) {
        yield ConfirmPackageFailure();
      }
    }

    if (event is UserUnlockedPackage) {
      // Silently unlock package
      unlockBookings(event.bookingIds);
    }
  }
}
