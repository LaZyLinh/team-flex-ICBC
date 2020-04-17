import 'package:FlexWork/models/availability.dart';
import 'package:FlexWork/util/api.dart';
import 'package:FlexWork/util/date.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

abstract class LendOfficeEvent {}

/// Triggered by BlocProvider
class LendOfficeStarted extends LendOfficeEvent {
  final int staffId;
  final bool hasWorkspace;
  final String workspaceId;

  LendOfficeStarted(
      {@required this.staffId,
      @required this.hasWorkspace,
      @required this.workspaceId});
}

/// Triggered by user
class NewLendingConfirmed extends LendOfficeEvent {
  final DateTime startDate;
  final DateTime endDate;

  NewLendingConfirmed(this.startDate, this.endDate);
}

/// Triggered by user
class WithdrawLendingConfirmed extends LendOfficeEvent {
  final int availabilityId;

  WithdrawLendingConfirmed(this.availabilityId);
}

abstract class LendOfficeState {}

/// Inital State
class LendOfficeInitial extends LendOfficeState {}

/// State for user without workspace (so they cannot lend office)
class LendOfficeInitialDisabled extends LendOfficeState {}

class LendOfficeInProgress extends LendOfficeState {}

class FetchLendingsSuccess extends LendOfficeState {
  final List<Availability> upcomingLendings;
  final List<Availability> pastLendings;

  FetchLendingsSuccess(this.upcomingLendings, this.pastLendings);
}

class FetchLendingsFailure extends LendOfficeState {}

class NewLendingSuccess extends FetchLendingsSuccess {
  NewLendingSuccess(
      List<Availability> upcomingLendings, List<Availability> pastLendings)
      : super(upcomingLendings, pastLendings);
}

class NewLendingFailure extends LendOfficeState {}

class WithdrawLendingSuccess extends FetchLendingsSuccess {
  WithdrawLendingSuccess(
      List<Availability> upcomingLendings, List<Availability> pastLendings)
      : super(upcomingLendings, pastLendings);
}

class WithdrawLendingFailure extends LendOfficeState {}

class LendOfficeBloc extends Bloc<LendOfficeEvent, LendOfficeState> {
  bool hasWorkspace;
  String workspaceId;
  int staffId;

  @override
  LendOfficeState get initialState => LendOfficeInitial();

  @override
  Stream<LendOfficeState> mapEventToState(LendOfficeEvent event) async* {
    if (event is LendOfficeStarted) {
      if (staffId != null) {
        return;
      }
      hasWorkspace = event.hasWorkspace;
      workspaceId = event.workspaceId;
      staffId = event.staffId;
      if (hasWorkspace) {
        yield LendOfficeInProgress();
        final midnight = todayMidnight();
        try {
          final lendings = await getLendings(staffId: staffId);
          final upcomingLendings = List<Availability>();
          final pastLendings = List<Availability>();
          lendings.forEach(
            (a) {
              if (a.endDate.isBefore(midnight)) {
                pastLendings.add(a);
              } else {
                upcomingLendings.add(a);
              }
            },
          );
          yield FetchLendingsSuccess(upcomingLendings, pastLendings);
        } catch (err) {
          yield FetchLendingsFailure();
          return;
        }
      } else {
        // no workspace
        yield LendOfficeInitialDisabled();
        return;
      }
    } else if (event is NewLendingConfirmed) {
      final upcomingLendings = (state as FetchLendingsSuccess).upcomingLendings;
      final pastLendings = (state as FetchLendingsSuccess).pastLendings;
      yield LendOfficeInProgress();
      try {
        final id = await makeAvailability(
            workspaceId,
            event.startDate.toString().substring(0, 10),
            event.endDate.toString().substring(0, 10));
        upcomingLendings.add(Availability(id, event.startDate, event.endDate));
        upcomingLendings
            .sort((lend1, lend2) => lend1.startDate.compareTo(lend2.startDate));
        yield NewLendingSuccess(upcomingLendings, pastLendings);
      } catch (err) {
        yield NewLendingFailure();
      }
    } else if (event is WithdrawLendingConfirmed) {
      final availabilityId = event.availabilityId;
      final upcomingLendings = (state as FetchLendingsSuccess).upcomingLendings;
      final pastLendings = (state as FetchLendingsSuccess).pastLendings;
      yield LendOfficeInProgress();
      try {
        await cancelAvailability(availabilityId);
        upcomingLendings
            .removeWhere((lending) => lending.availabilityId == availabilityId);
        yield WithdrawLendingSuccess(upcomingLendings, pastLendings);
      } catch (err) {
        yield WithdrawLendingFailure();
      }
    }
  }
}
