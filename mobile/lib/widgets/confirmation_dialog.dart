import 'package:FlexWork/blocs/book_office_bloc.dart';
import 'package:FlexWork/util/theme.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:quiver/async.dart';

const MINUTES = 20;

class BookingConfirmationTimerDialog extends StatefulWidget {
  final List<int> bookingIds;

  BookingConfirmationTimerDialog({@required this.bookingIds});

  @override
  State<StatefulWidget> createState() => _BookingConfirmationTimerDialogState();
}

class _BookingConfirmationTimerDialogState
    extends State<BookingConfirmationTimerDialog> {
  CountdownTimer timer;

  @override
  void initState() {
    super.initState();
    timer = CountdownTimer(Duration(minutes: MINUTES), Duration(seconds: 1));
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoAlertDialog(
      title: Text("Confirm Booking"),
      content: StreamBuilder(
        initialData: timer,
        stream: timer,
        builder: (_, AsyncSnapshot<CountdownTimer> snapshot) {
          final int minutesLeft = snapshot.data.remaining.inMinutes;
          final int secondsLeft = snapshot.data.remaining.inSeconds % 60;
          if (secondsLeft == 0) {
            Navigator.of(context).pop();
            return Container();
          } else {
            return Padding(
              padding: const EdgeInsets.only(top: 12.0),
              child: RichText(
                text: TextSpan(
                  text: "The booking have been locked for you for the next ",
                  style: TextStyle(color: Colors.black, fontSize: 16),
                  children: <TextSpan>[
                    TextSpan(
                        text: minutesLeft.toString(),
                        style: TextStyle(color: ICBC_BLUE)),
                    TextSpan(text: " minutes and "),
                    TextSpan(
                        text: secondsLeft.toString(),
                        style: TextStyle(color: ICBC_BLUE)),
                    TextSpan(text: " seconds.")
                  ],
                ),
              ),
            );
          }
        },
      ),
      actions: <Widget>[
        CupertinoDialogAction(
          isDefaultAction: true,
          child: Text("Confirm"),
          onPressed: () {
            BlocProvider.of<BookOfficeBloc>(context)
                .add(UserConfirmedPackage(widget.bookingIds));
            Navigator.of(context).pop();
          },
        ),
        CupertinoDialogAction(
            child: Text("Cancel"),
            onPressed: () {
              BlocProvider.of<BookOfficeBloc>(context)
                  .add(UserUnlockedPackage(widget.bookingIds));
              Navigator.of(context).pop();
            }),
      ],
    );
  }
}
