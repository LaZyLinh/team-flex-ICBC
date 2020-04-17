import 'package:FlexWork/blocs/lend_office_bloc.dart';
import 'package:FlexWork/blocs/user_bloc.dart';
import 'package:FlexWork/models/availability.dart';
import 'package:FlexWork/util/snackbar.dart';
import 'package:FlexWork/util/theme.dart';
import 'package:FlexWork/widgets/lend_date_range_picker.dart';
import 'package:FlexWork/widgets/rc_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

final colors = [
  Color.fromRGBO(187, 222, 242, 1.0),
  Color.fromRGBO(252, 187, 227, 1.0),
  Color.fromRGBO(239, 231, 157, 1.0),
  Colors.lightGreen[300],
];

class LendOffice extends StatelessWidget {
  lending(Availability a, index, context) {
    final format = DateFormat.MEd();
    final duration = a.endDate.difference(a.startDate).inDays + 1;

    return Row(
      children: <Widget>[
        Expanded(
          flex: 1,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text(
                duration.toString(),
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w500),
              ),
              Text(
                duration == 1 ? "DAY" : "DAYS",
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              ),
            ],
          ),
        ),
        Expanded(
          flex: 5,
          child: Padding(
            padding: const EdgeInsets.only(top: 8, bottom: 8, left: 8),
            child: Container(
              color: colors[index % colors.length],
              child: Padding(
                padding:
                    const EdgeInsets.only(top: 8.0, left: 12.0, bottom: 8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    RichText(
                      text: TextSpan(
                        text: "Start date: ",
                        style: TextStyle(color: Colors.black),
                        children: <TextSpan>[
                          TextSpan(
                            text: format.format(a.startDate),
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                    RichText(
                      text: TextSpan(
                        text: "End date: ",
                        style: TextStyle(color: Colors.black),
                        children: <TextSpan>[
                          TextSpan(
                            text: format.format(a.endDate),
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
        Container(
          width: 55,
          child: FlatButton(
            splashColor: Colors.red,
            child: Icon(Icons.delete_outline),
            onPressed: () {
              showDialog(
                  context: context,
                  barrierDismissible: false,
                  child: AlertDialog(
                      title: Text("Confirm Withdraw"),
                      content: Text(
                          "Are you sure you with to withdraw this offering? A notification email will be sent to those with bookings on it."),
                      actions: <Widget>[
                        CupertinoButton(
                          child: Text("Withdraw",
                              style: TextStyle(color: Colors.red)),
                          onPressed: () {
                            BlocProvider.of<LendOfficeBloc>(context).add(
                                WithdrawLendingConfirmed(a.availabilityId));
                            Navigator.of(context).pop();
                          },
                        ),
                        CupertinoButton(
                            child: Text("Cancel"),
                            onPressed: () {
                              Navigator.of(context).pop();
                            })
                      ]));
            },
          ),
        ),
      ],
    );
  }

  currentLendings(List<Availability> lendings, context) {
    if (lendings.isEmpty) {
      return Expanded(
          flex: 1,
          child: Center(child: Text("You have no active lendings on record.")));
    } else
      return Expanded(
        flex: 1,
        child: RoundedCornerContainer(
          radius: 15,
          color: Colors.white,
          child: Padding(
            padding: const EdgeInsets.only(left: 20.0, right: 17.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding:
                      const EdgeInsets.only(top: 24.0, bottom: 16.0, left: 20),
                  child: Text("Your Active Lendings:",
                      style: TextStyle(
                          fontSize: 20,
                          color: Colors.black,
                          fontWeight: FontWeight.bold)),
                ),
                Expanded(
                  flex: 1,
                  child: MediaQuery.removePadding(
                    context: context,
                    removeTop: true,
                    child: ListView.builder(
                      itemCount: lendings.length,
                      itemBuilder: (context, index) {
                        return lending(lendings[index], index, context);
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<LendOfficeBloc, LendOfficeState>(
      builder: (context, state) {
        if (state is LendOfficeInitialDisabled) {
          return Column(
            children: <Widget>[
              Spacer(),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: RoundedCornerContainer(
                  radius: 15,
                  color: Colors.black.withOpacity(0.7),
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(28.0),
                      child: Text(
                        "Cannot lend office because you have no registered workspace.\n\nPlease contact your facility administrator to facilitate this.",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white, fontSize: 16),
                      ),
                    ),
                  ),
                ),
              ),
              Spacer(),
            ],
          );
        }

        if (state is LendOfficeInitial || state is LendOfficeInProgress) {
          return Center(
              child: CircularProgressIndicator(backgroundColor: Colors.white));
        }

        if (state is FetchLendingsFailure) {
          // TODO implement recovery mechanism
          return Center(
            child: Text(
                "There was an error loading your offerings. Please try again later."),
          );
        }

        if (state is FetchLendingsSuccess) {
          return BlocBuilder<UserBloc, UserState>(
            builder: (context, userState) {
              return Padding(
                padding: const EdgeInsets.only(
                    top: 80.0, left: 15, right: 15, bottom: 10),
                child: RoundedCornerContainer(
                  radius: 15,
                  // color: Colors.grey[300],
                  color: Colors.white,
                  child: Column(
                    children: <Widget>[
                      currentLendings(state.upcomingLendings, context),
                      Divider(),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8.0),
                        child: CupertinoButton(
                          child: Text("Create Lending"),
                          onPressed: () {
                            showBottomSheet(
                              backgroundColor: Colors.white.withOpacity(0.0),
                              context: context,
                              builder: (context) {
                                return LendDateRangePicker(
                                    workspaceId: (userState as UserLoginSuccess)
                                        .user
                                        .workspaceId,
                                    existingLendings: state.upcomingLendings);
                              },
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        }

        // Unknown state
        return Center(
          child: CircularProgressIndicator(),
        );
      },
      listener: (BuildContext context, LendOfficeState state) {
        if (state is NewLendingSuccess) {
          showSnackBar(
            context,
            "Lending created!",
            backgroundColor: Colors.white,
            textColor: ICBC_BLUE,
          );
        }
        if (state is NewLendingFailure) {
          showSnackBar(
            context,
            "There was an error creating this offering.",
            backgroundColor: Colors.white,
            textColor: Colors.red[700],
          );
        }
        if (state is WithdrawLendingSuccess) {
          showSnackBar(
            context,
            "Lending withdrawn.",
            backgroundColor: Colors.white,
            textColor: ICBC_BLUE,
          );
        }
      },
    );
  }
}
