import 'package:equatable/equatable.dart';

class Booking extends Equatable {
  final int bookingId;
  final String workspaceId;
  final int floorId;
  final DateTime startDate;
  final DateTime endDate;
  final String city;
  final String building;
  final int ownerStaffId;
  final String ownerFirstName;
  final String ownerLastName;
  final String ownerEmail;

  Booking({
    this.bookingId,
    this.workspaceId,
    this.floorId,
    this.startDate,
    this.endDate,
    this.city,
    this.building,
    this.ownerStaffId,
    this.ownerFirstName,
    this.ownerLastName,
    this.ownerEmail,
  });

  @override
  List<Object> get props => [bookingId];
}
