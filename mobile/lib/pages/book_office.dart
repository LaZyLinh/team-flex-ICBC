import 'package:FlexWork/blocs/book_office_bloc.dart';
import 'package:FlexWork/blocs/my_bookings_bloc.dart';
import 'package:FlexWork/blocs/user_bloc.dart';
import 'package:FlexWork/models/package.dart';
import 'package:FlexWork/util/snackbar.dart';
import 'package:FlexWork/util/theme.dart';
import 'package:FlexWork/widgets/book_office_form.dart';
import 'package:FlexWork/widgets/confirmation_dialog.dart';
import 'package:FlexWork/widgets/rc_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

import 'package:photo_view/photo_view.dart';

class BookOffice extends StatelessWidget {
  final int staffId;
  final Function resetPageCallback;

  BookOffice({@required this.staffId, @required this.resetPageCallback});

  bookingOption(context, Package package) {
    final bookingOption = package.bookingSuggestions[0];
    final format = DateFormat.MMMEd();

    return Container(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Container(
                  color: Colors.green[500],
                  child: Padding(
                    padding: const EdgeInsets.only(
                        top: 4.0, bottom: 4.0, left: 30, right: 30),
                    child: Center(
                      child: Text(bookingOption.city,
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                              fontSize: 18)),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 12.0, right: 12.0),
                child: Center(
                  child: Text(format.format(bookingOption.startDate),
                      style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
              SizedBox(height: 6),
              Center(
                child: Text("- " + format.format(bookingOption.endDate),
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              ),
              CupertinoButton(
                  child: Text(
                    "Book Option",
                    style: TextStyle(
                        fontSize: 15, color: Color.fromRGBO(0, 163, 254, 1.0)),
                  ),
                  onPressed: () {
                    BlocProvider.of<BookOfficeBloc>(context)
                        .add(UserLockedPackage(package));
                    Navigator.of(context).pop();
                  })
            ],
          ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: const EdgeInsets.only(right: 10.0),
              child: RoundedCornerContainer(
                color: Color.fromRGBO(226, 240, 248, 1.0),
                radius: 15,
                child: Container(
                  height: 130,
                  width: 200,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Center(
                          child: CupertinoButton(
                        child: Icon(Icons.map, size: 18),
                        onPressed: () {
                          showDialog(
                            context: context,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Material(
                                  child: AspectRatio(
                                    child: PhotoView(
                                      imageProvider: NetworkImage(
                                          "https://icbcflexwork.me:8080/floorplans/${bookingOption.floorId}.jpg"),
                                    ),
                                    aspectRatio: 3 / 2,
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      )),
                      Padding(
                        padding: const EdgeInsets.only(left: 15),
                        child: Text("Building: ${bookingOption.building}"),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 15),
                        child: RichText(
                            text: TextSpan(
                                style: TextStyle(color: Colors.black),
                                text: "Workspace: ",
                                children: <TextSpan>[
                              TextSpan(
                                  text: bookingOption.workspaceId,
                                  style:
                                      TextStyle(fontWeight: FontWeight.bold)),
                            ])),
                      ),
                      bookingOption.comment == null
                          ? Container()
                          : Center(
                              child: CupertinoButton(
                                child: Text("Show Owner Comment",
                                    style: TextStyle(fontSize: 14)),
                                onPressed: () => showDialog(
                                  context: context,
                                  child: CupertinoAlertDialog(
                                    title: Text("Owner's comment"),
                                    content: Text(bookingOption.comment),
                                  ),
                                ),
                              ),
                            )
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  bookingSuggestion(context, BookingSuggestion bookingSuggestion) {
    final format = DateFormat.MMMEd();

    return Container(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Container(
                  color: Color.fromRGBO(42, 159, 68, 1),
                  child: Padding(
                    padding: const EdgeInsets.only(
                        top: 4.0, bottom: 4.0, left: 30, right: 30),
                    child: Center(
                      child: Text(bookingSuggestion.city,
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w500,
                              fontSize: 18)),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 12.0, right: 12.0),
                child: Center(
                  child: Text(format.format(bookingSuggestion.startDate),
                      style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
              SizedBox(height: 6),
              Center(
                child: Text("- " + format.format(bookingSuggestion.endDate),
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              ),
            ],
          ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: const EdgeInsets.only(right: 10.0),
              child: RoundedCornerContainer(
                color: Color.fromRGBO(226, 240, 248, 1.0),
                radius: 15,
                child: Container(
                  height: 130,
                  width: 200,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Center(
                          child: CupertinoButton(
                        child: Icon(Icons.map, size: 18),
                        onPressed: () {
                          showDialog(
                            context: context,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: <Widget>[
                                Material(
                                  child: AspectRatio(
                                    child: PhotoView(
                                      imageProvider: NetworkImage(
                                          "https://icbcflexwork.me:8080/floorplans/${bookingSuggestion.floorId}.jpg"),
                                    ),
                                    aspectRatio: 3 / 2,
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      )),
                      Padding(
                        padding: const EdgeInsets.only(left: 15),
                        child: Text("Building: ${bookingSuggestion.building}"),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 15),
                        child: RichText(
                            text: TextSpan(
                                style: TextStyle(color: Colors.black),
                                text: "Workspace: ",
                                children: <TextSpan>[
                              TextSpan(
                                  text: bookingSuggestion.workspaceId,
                                  style:
                                      TextStyle(fontWeight: FontWeight.bold)),
                            ])),
                      ),
                      bookingSuggestion.comment == null
                          ? Container()
                          : Center(
                              child: CupertinoButton(
                                child: Text("Show Owner Comment",
                                    style: TextStyle(fontSize: 14)),
                                onPressed: () => showDialog(
                                  context: context,
                                  child: CupertinoAlertDialog(
                                    title: Text("Owner's comment"),
                                    content: Text(bookingSuggestion.comment),
                                  ),
                                ),
                              ),
                            )
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MyBookingsBloc, MyBookingsState>(
        builder: (context, myBookingsState) {
      if (myBookingsState is MyBookingsFetchSuccess) {
        return BlocBuilder<UserBloc, UserState>(
          builder: (context, userState) {
            BlocProvider.of<BookOfficeBloc>(context).add(BookOfficeStarted(
                staffId: (userState as UserLoginSuccess).user.staffId,
                upcomingBookings: myBookingsState.upcomingBookings));
            return BlocConsumer<BookOfficeBloc, BookOfficeState>(
              buildWhen: (prev, curr) {
                return curr is BookOfficeUninitialized ||
                    curr is BookOfficeFetchLocationsAndFeaturesInProgress ||
                    curr is BookOfficeInitialized;
              },
              builder: (BuildContext context, bookOfficeState) {
                // Form is not ready yet
                if (bookOfficeState is BookOfficeUninitialized ||
                    bookOfficeState
                        is BookOfficeFetchLocationsAndFeaturesInProgress) {
                  return Center(child: CircularProgressIndicator());
                }

                if (bookOfficeState is BookOfficeInitialized) {
                  // Form is ready
                  return BookOfficeForm(bookOfficeState.bookings,
                      bookOfficeState.locations, bookOfficeState.features);
                }

                return BookOfficeForm(
                    myBookingsState.upcomingBookings,
                    BlocProvider.of<BookOfficeBloc>(context).locations,
                    BlocProvider.of<BookOfficeBloc>(context).features);
              },
              listener: (BuildContext context, state) {
                if (state is FetchPackagesInProgress) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(context, "Searching ...",
                      backgroundColor: ICBC_BLUE, textColor: Colors.white);
                } else if (state is FetchPackagesFailure) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(
                      context, "There was an error performing the search.",
                      backgroundColor: Colors.red, textColor: Colors.white);
                } else if (state is FetchPackagesSuccess) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  if (state.packages.isEmpty) {
                    showDialog(
                        context: context,
                        builder: (context) => CupertinoAlertDialog(
                              title: Text("No workspaces available"),
                              content: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Text(
                                    "Please try again later or change your criteria",
                                    style: TextStyle(fontSize: 15)),
                              ),
                            ));
                  } else {
                    Widget dialogBody;
                    if (state.packages[0].type ==
                        PackageType.SingleAvailability) {
                      String message = "Here are your booking options";
                      dialogBody = Container(
                        color: Colors.white,
                        child: Column(
                          children: <Widget>[
                            Padding(
                              padding:
                                  const EdgeInsets.only(top: 8.0, bottom: 40.0),
                              child: Container(
                                  width: double.infinity,
                                  color: Color.fromRGBO(226, 240, 248, 1.0),
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Center(
                                      child: Text(message,
                                          style: TextStyle(fontSize: 15)),
                                    ),
                                  )),
                            ),
                            Expanded(
                              flex: 1,
                              child: ListView.builder(
                                itemCount: state.packages.length,
                                itemExtent: 150,
                                itemBuilder: (context, index) {
                                  return bookingOption(
                                      context, state.packages[index]);
                                },
                              ),
                            ),
                            Center(
                                child: CupertinoButton(
                              child: Text(
                                "Back",
                                // style: TextStyle(color: Colors.red),
                              ),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ))
                          ],
                        ),
                      );
                    } else {
                      dialogBody = Container(
                        color: Colors.white,
                        child: Column(
                          children: <Widget>[
                            Padding(
                              padding:
                                  const EdgeInsets.only(top: 8.0, bottom: 40.0),
                              child: Container(
                                  width: double.infinity,
                                  color: Color.fromRGBO(226, 240, 248, 1.0),
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Center(
                                      child: Text(
                                          "We couldn't find an office for that full duration.\nHere is a booking package that combines multiple.",
                                          textAlign: TextAlign.center,
                                          style: TextStyle(fontSize: 15)),
                                    ),
                                  )),
                            ),
                            Expanded(
                              flex: 1,
                              child: ListView.builder(
                                itemCount:
                                    state.packages[0].bookingSuggestions.length,
                                itemExtent: 150,
                                itemBuilder: (context, index) {
                                  return bookingSuggestion(
                                      context,
                                      state.packages[0]
                                          .bookingSuggestions[index]);
                                },
                              ),
                            ),
                            Center(
                                child: CupertinoButton(
                              child: Text(
                                "Book Entire Package",
                                // style: TextStyle(color: Colors.red),
                              ),
                              onPressed: () {
                                BlocProvider.of<BookOfficeBloc>(context)
                                    .add(UserLockedPackage(state.packages[0]));
                                Navigator.of(context).pop();
                              },
                            )),
                            Center(
                                child: CupertinoButton(
                              child: Text(
                                "Back",
                                // style: TextStyle(color: Colors.red),
                              ),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ))
                          ],
                        ),
                      );
                    }

                    showDialog(
                      barrierDismissible: false,
                      context: context,
                      builder: (context) => Padding(
                        padding: const EdgeInsets.only(top: 50.0, bottom: 60),
                        child: Material(
                          child: dialogBody,
                        ),
                      ),
                    );
                  }
                } else if (state is LockPackageInProgress) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(context, "Attempting to secure your booking...",
                      backgroundColor: Colors.white, textColor: Colors.blue);
                } else if (state is LockPackageFailure) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(context,
                      "There was an issue securing your booking. It may have been taken.",
                      backgroundColor: Colors.white, textColor: Colors.red);
                } else if (state is LockPackageSuccess) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  final List<int> bookingIds = state.bookingIds;
                  showCupertinoDialog(
                      context: context,
                      builder: (context) {
                        return BookingConfirmationTimerDialog(
                            bookingIds: bookingIds);
                      });
                } else if (state is ConfirmPackageInProgress) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(context, "Finalizing your booking...",
                      backgroundColor: Colors.white, textColor: Colors.blue);
                } else if (state is ConfirmPackageFailure) {
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(context,
                      "There was an issue securing your booking. There may be a connection issue.",
                      backgroundColor: Colors.white, textColor: Colors.red);
                } else if (state is ConfirmPackageSuccess) {
                  BlocProvider.of<MyBookingsBloc>(context).add(RefetchBookings(
                      (userState as UserLoginSuccess).user.staffId));
                  Scaffold.of(context).hideCurrentSnackBar();
                  showSnackBar(context, "Booking finalized!",
                      backgroundColor: Colors.white, textColor: Colors.blue);
                  resetPageCallback();
                }
              },
            );
          },
        );
      } else {
        return Center(child: CircularProgressIndicator());
      }
    });
  }
}
