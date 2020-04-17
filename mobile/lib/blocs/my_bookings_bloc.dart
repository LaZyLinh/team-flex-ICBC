import 'package:FlexWork/models/booking.dart';
import 'package:FlexWork/util/api.dart';
import 'package:FlexWork/util/date.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

abstract class MyBookingsEvent extends Equatable {
  @override
  List<Object> get props => null;
}

class MyBookingsFetchEvent extends MyBookingsEvent {
  final int staffId;

  MyBookingsFetchEvent(this.staffId);
}

class RefetchBookings extends MyBookingsFetchEvent {
  RefetchBookings(int staffId) : super(staffId);
}

class MyBookingsStarted extends MyBookingsFetchEvent {
  MyBookingsStarted(int staffId) : super(staffId);
}

class MyBookingsDeleted extends MyBookingsEvent {
  final int bookingId;

  MyBookingsDeleted(this.bookingId);

  @override
  List<Object> get props => [bookingId];
}

abstract class MyBookingsState extends Equatable {
  @override
  List<Object> get props => null;
}

class MyBookingsInitial extends MyBookingsState {}

class MyBookingsInProgress extends MyBookingsState {}

class MyBookingsFetchSuccess extends MyBookingsState {
  final List<Booking> upcomingBookings;
  final List<Booking> pastBookings;

  MyBookingsFetchSuccess({this.upcomingBookings, this.pastBookings});

  @override
  List<Object> get props => [...upcomingBookings, ...pastBookings];
}

class MyBookingsFetchFailure extends MyBookingsState {}

class MyBookingsDeleteInProgress extends MyBookingsFetchSuccess {}

class MyBookingsDeleteSuccess extends MyBookingsFetchSuccess {
  MyBookingsDeleteSuccess({upcomingBookings, pastBookings})
      : super(upcomingBookings: upcomingBookings, pastBookings: pastBookings);
}

class MyBookingsDeleteFailure extends MyBookingsFetchSuccess {
  MyBookingsDeleteFailure({upcomingBookings, pastBookings})
      : super(upcomingBookings: upcomingBookings, pastBookings: pastBookings);
}

class MyBookingsBloc extends Bloc<MyBookingsEvent, MyBookingsState> {
  int staffId;

  MyBookingsBloc();

  @override
  MyBookingsState get initialState => MyBookingsInitial();

  @override
  Stream<MyBookingsState> mapEventToState(MyBookingsEvent event) async* {
    if (event is MyBookingsStarted && staffId != null) {
      return;
    }
    if (event is MyBookingsFetchEvent) {
      staffId = event.staffId;
      yield MyBookingsInProgress();
      final midnight = todayMidnight();
      try {
        final _bookings = await bookings(staffId);
        final upcomingBookings = List<Booking>();
        final pastBookings = List<Booking>();
        _bookings.forEach(
          (b) {
            if (b.endDate.isBefore(midnight)) {
              pastBookings.add(b);
            } else {
              upcomingBookings.add(b);
            }
          },
        );
        yield MyBookingsFetchSuccess(
          upcomingBookings: upcomingBookings,
          pastBookings: pastBookings,
        );
      } catch (err) {
        yield MyBookingsFetchFailure();
      }
    } else if (event is MyBookingsDeleted) {
      final bookingId = event.bookingId;
      final upcomingBookings =
          (state as MyBookingsFetchSuccess).upcomingBookings;
      final pastBookings = (state as MyBookingsFetchSuccess).pastBookings;
      yield MyBookingsDeleteInProgress();
      try {
        await deleteBooking(bookingId);
        upcomingBookings.removeWhere((b) => b.bookingId == bookingId);
        yield MyBookingsDeleteSuccess(
            upcomingBookings: upcomingBookings, pastBookings: pastBookings);
      } catch (err) {
        yield MyBookingsDeleteFailure(
            upcomingBookings: upcomingBookings, pastBookings: pastBookings);
      }
    }
  }
}
