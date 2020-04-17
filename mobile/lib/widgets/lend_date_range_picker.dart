import 'package:FlexWork/blocs/lend_office_bloc.dart';
import 'package:FlexWork/models/availability.dart';
import 'package:FlexWork/util/date.dart';
import 'package:FlexWork/widgets/rc_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

class LendDateRangePicker extends StatefulWidget {
  final String workspaceId;
  final List<Availability> existingLendings;

  LendDateRangePicker({this.workspaceId, this.existingLendings});

  @override
  _LendDateRangePickerState createState() => _LendDateRangePickerState();
}

class _LendDateRangePickerState extends State<LendDateRangePicker>
    with SingleTickerProviderStateMixin {
  DateTime firstOpenDate;
  DateTime topDate;
  DateTime bottomDate;
  DateTime maxDate;
  AnimationController controller;

  @override
  void initState() {
    super.initState();
    final tomorrow = todayMidnight().add(Duration(days: 1));
    firstOpenDate = determineFirstOpenDateFrom(tomorrow);
    topDate = firstOpenDate;
    bottomDate = firstOpenDate;
    maxDate = tomorrow.add(
      Duration(days: 365),
    );
    controller = AnimationController(
      vsync: this,
    );
    controller.repeat(period: Duration(milliseconds: 3000));
  }

  determineFirstOpenDateFrom(DateTime tomorrow) {
    var date = tomorrow;
    for (final lending in widget.existingLendings) {
      if (!date.isBefore(lending.startDate) && !date.isAfter(lending.endDate)) {
        date = lending.endDate.add(Duration(days: 1));
      }
    }
    return date;
  }

  topDateChanged(DateTime value) {
    if (topDate.compareTo(bottomDate) > 0) {
      setState(() {
        topDate = value;
        bottomDate = value;
      });
    } else {
      setState(() => topDate = value);
    }
  }

  bottomDateChanged(DateTime value) {
    if (topDate.compareTo(bottomDate) > 0) {
      setState(() {
        topDate = value;
        bottomDate = value;
      });
    } else {
      setState(() => bottomDate = value);
    }
  }

  bool verifyNoConflict() {
    for (final lending in widget.existingLendings) {
      if (overlaps(lending.startDate, lending.endDate, topDate, bottomDate)) {
        return false;
      }
    }
    return true;
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final format = DateFormat.MMMEd();
    var message;
    Function handleCupertinoButtonPress;

    bool _noConflict = verifyNoConflict();

    var button;

    if (_noConflict) {
      message = RichText(
        text: TextSpan(
          style: TextStyle(color: Colors.black),
          text: "Lend ",
          children: <TextSpan>[
            TextSpan(
                text: widget.workspaceId,
                style: TextStyle(fontWeight: FontWeight.bold)),
            TextSpan(text: " from "),
            TextSpan(
                text: format.format(topDate),
                style: TextStyle(fontWeight: FontWeight.bold)),
            TextSpan(text: " to "),
            TextSpan(
                text: format.format(bottomDate),
                style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      );

      handleCupertinoButtonPress = () {
        BlocProvider.of<LendOfficeBloc>(context)
            .add(NewLendingConfirmed(topDate, bottomDate));
        Navigator.of(context).pop();
      };

      button = Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          AnimatedIcon(
              icon: AnimatedIcons.event_add, progress: controller, size: 20),
          Text(" Confirm", style: TextStyle(fontSize: 20)),
        ],
      );
    } else {
      button =
          Text('Please choose different dates', style: TextStyle(fontSize: 20));
      message = RichText(
          text: TextSpan(
              style: TextStyle(color: Colors.red[700]),
              text: "Date conflict."));
    }

    return Padding(
      padding: const EdgeInsets.only(left: 15.0, right: 15.0),
      child: RoundedCornerContainer(
        radius: 15,
        color: Colors.white,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(18.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(" Create Lending",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                height: 50,
                child: CupertinoDatePicker(
                  backgroundColor: Colors.white.withOpacity(0.0),
                  mode: CupertinoDatePickerMode.date,
                  onDateTimeChanged: topDateChanged,
                  initialDateTime: topDate,
                  minimumDate: firstOpenDate,
                  maximumDate: bottomDate,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0, bottom: 12.0),
              child: Container(
                height: 50,
                child: CupertinoDatePicker(
                  backgroundColor: Colors.white.withOpacity(0.0),
                  mode: CupertinoDatePickerMode.date,
                  onDateTimeChanged: bottomDateChanged,
                  initialDateTime: bottomDate,
                  minimumDate: topDate,
                  maximumDate: maxDate,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 8.0),
              child: Center(
                child: message,
              ),
            ),
            CupertinoButton(
              child: button,
              onPressed: handleCupertinoButtonPress,
            ),
          ],
        ),
      ),
    );
  }
}
