class BookingSuggestion {
  final int availabilityId;
  final DateTime startDate;
  final DateTime endDate;
  final String workspaceId;
  final String comment;
  final int floorNo;
  final String building;
  final String city;
  final int floorId;

  BookingSuggestion(
      this.availabilityId,
      this.startDate,
      this.endDate,
      this.workspaceId,
      this.comment,
      this.floorNo,
      this.building,
      this.city,
      this.floorId);
}

enum PackageType { SingleAvailability, MultiAvailability }

class Package {
  final PackageType type;
  final List<BookingSuggestion> bookingSuggestions;

  Package(this.type, this.bookingSuggestions);
}

class Floor {
  final String floorName;
  final int floorId;

  Floor(this.floorId, this.floorName);
}

class Feature {
  final String featureName;
  final int featureId;

  Feature(this.featureName, this.featureId);
}
