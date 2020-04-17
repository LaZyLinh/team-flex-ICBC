import 'package:equatable/equatable.dart';

class Availability extends Equatable {
  final DateTime startDate;
  final DateTime endDate;
  final int availabilityId;

  Availability(this.availabilityId, this.startDate, this.endDate);

  @override
  List<Object> get props => [availabilityId];
}
