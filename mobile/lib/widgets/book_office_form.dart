import 'package:FlexWork/blocs/book_office_bloc.dart';
import 'package:FlexWork/models/booking.dart';
import 'package:FlexWork/models/package.dart';
import 'package:FlexWork/util/date.dart';
import 'package:FlexWork/util/theme.dart';
import 'package:FlexWork/widgets/rc_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

class BookOfficeForm extends StatefulWidget {
  final List<Booking> existingBookings;
  final Map<String, List<Floor>> locations;
  final List<Feature> features;

  BookOfficeForm(this.existingBookings, this.locations, this.features);

  @override
  _BookOfficeFormState createState() => _BookOfficeFormState();
}

const _CALENDAR_HEIGHT = 50.0;

class _BookOfficeFormState extends State<BookOfficeForm>
    with SingleTickerProviderStateMixin {
  DateTime firstOpenDate;
  DateTime topDate;
  DateTime bottomDate;
  DateTime maxDate;
  String selectedCity;
  List<Feature> selectedFeatures = <Feature>[];
  AnimationController controller;

  @override
  void initState() {
    super.initState();
    final tomorrow = todayMidnight().add(Duration(days: 1));
    firstOpenDate = determineFirstOpenDateFrom(tomorrow);
    topDate = firstOpenDate;
    bottomDate = firstOpenDate;
    selectedCity = widget.locations.keys.toList()[0];
    maxDate = tomorrow.add(
      Duration(days: 365),
    );
    controller = AnimationController(
      vsync: this,
    );
    controller.repeat(period: Duration(milliseconds: 3000));
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  determineFirstOpenDateFrom(DateTime tomorrow) {
    var date = tomorrow;
    for (final lending in widget.existingBookings) {
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
    for (final lending in widget.existingBookings) {
      if (overlaps(lending.startDate, lending.endDate, topDate, bottomDate)) {
        return false;
      }
    }
    return true;
  }

  List<Widget> locations() {
    final list = <Widget>[];
    for (final loc in widget.locations.keys) {
      list.add(Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          loc == selectedCity
              ? Icon(Icons.swap_vert, color: ICBC_BLUE)
              : Container(),
          Text(loc),
        ],
      ));
    }
    return list;
  }

  Widget feature(Feature f) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          Text(f.featureName),
          CupertinoSwitch(
              activeColor: ICBC_BLUE,
              value: selectedFeatures.contains(f),
              onChanged: (value) {
                setState(() {
                  if (value) {
                    selectedFeatures.add(f);
                  } else {
                    selectedFeatures.remove(f);
                  }
                });
              }),
        ],
      ),
    );
  }

  List<Widget> features() {
    final list = <Widget>[];
    for (final f in widget.features) {
      list.add(feature(f));
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final format = DateFormat.MMMEd();
    RichText message;
    Function handleCupertinoButtonPress;

    bool _noConflict = verifyNoConflict();
    var button;

    if (_noConflict) {
      message = RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          style: TextStyle(color: Colors.black, fontSize: 15),
          text: "Find ",
          children: <TextSpan>[
            selectedFeatures.isEmpty
                ? TextSpan(
                    text: "any", style: TextStyle(fontWeight: FontWeight.bold))
                : TextSpan(text: "an"),
            TextSpan(text: " office from "),
            TextSpan(
                text: format.format(topDate),
                style: TextStyle(fontWeight: FontWeight.bold)),
            TextSpan(text: " until "),
            TextSpan(
                text: format.format(bottomDate),
                style: TextStyle(fontWeight: FontWeight.bold)),
            TextSpan(text: " in "),
            TextSpan(
                text: selectedCity,
                style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      );

      if (selectedFeatures.isNotEmpty) {
        final textSpanArr = (message.text as TextSpan).children;
        textSpanArr.add(TextSpan(text: " with "));
        for (int i = 0; i < selectedFeatures.length; i++) {
          final feature = selectedFeatures[i];
          textSpanArr.add(TextSpan(
              text: feature.featureName,
              style: TextStyle(fontWeight: FontWeight.bold)));
          // Add 'and' if it's second last one, add nothing if last one, otherwise add comma
          if (i == selectedFeatures.length - 2) {
            textSpanArr.add(TextSpan(text: " and "));
          } else if (i == selectedFeatures.length - 1) {
            // add nothing
          } else {
            textSpanArr.add(TextSpan(text: ", "));
          }
        }
      }

      button = Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          AnimatedIcon(
              icon: AnimatedIcons.search_ellipsis,
              progress: controller,
              size: 20),
          Text(" Search", style: TextStyle(fontSize: 20)),
        ],
      );
      handleCupertinoButtonPress = () {
        List<int> floors = [];
        for (final floor in widget.locations[selectedCity]) {
          floors.add(floor.floorId);
        }
        List<int> features = [];
        for (final f in selectedFeatures) {
          features.add(f.featureId);
        }
        BlocProvider.of<BookOfficeBloc>(context).add(UserAppliedFilter(
          startDate: topDate,
          endDate: bottomDate,
          floorIds: floors,
          features: features,
        ));
      };
    } else {
      button = Center(
        child: Text(
          'Please choose different dates',
          style: TextStyle(fontSize: 20),
        ),
      );

      message = RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
            style: TextStyle(color: Colors.red[700], fontSize: 16),
            text:
                "Date conflict with existing booking. Please choose different dates."),
      );
    }

    return Padding(
      padding:
          const EdgeInsets.only(left: 15.0, right: 15.0, top: 80, bottom: 15.0),
      child: RoundedCornerContainer(
        color: Colors.white,
        radius: 15,
        child: Padding(
          padding: const EdgeInsets.only(left: 15.0, right: 15.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding:
                    const EdgeInsets.only(top: 24.0, bottom: 16.0, left: 20),
                child: Text("Book an ICBC office:",
                    style: TextStyle(
                        fontSize: 20,
                        color: Colors.black,
                        fontWeight: FontWeight.bold)),
              ),
              Spacer(),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  height: _CALENDAR_HEIGHT,
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
                padding: const EdgeInsets.only(top: 8.0),
                child: Container(
                  height: _CALENDAR_HEIGHT,
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
              SizedBox(
                height: 115,
                child: CupertinoPicker(
                  backgroundColor: Colors.white,
                  itemExtent: 30,
                  onSelectedItemChanged: (index) {
                    final city = widget.locations.keys.toList()[index];
                    setState(() {
                      selectedCity = city;
                    });
                  },
                  children: locations(),
                ),
              ),
              SizedBox(
                height: 75,
                child: Center(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: features(),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 50,
                child: message,
              ),
              CupertinoButton(
                  child: button, onPressed: handleCupertinoButtonPress)
            ],
          ),
        ),
      ),
    );
  }
}
