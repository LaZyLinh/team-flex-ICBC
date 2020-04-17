import 'dart:ui';
import 'package:FlexWork/blocs/my_bookings_bloc.dart';
import 'package:FlexWork/models/booking.dart';
import 'package:FlexWork/util/date.dart';
import 'package:FlexWork/util/snackbar.dart';
import 'package:FlexWork/util/theme.dart';
import 'package:FlexWork/widgets/rc_container.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

import 'package:photo_view/photo_view.dart';

/// Previous version of UI
// class _UpcomingBookings extends StatelessWidget {
//   final List<Booking> bookings;

//   _UpcomingBookings({this.bookings});

//   @override
//   Widget build(BuildContext context) {
//     final dateFormatShort = DateFormat.MMMEd();
//     final dateFormatLong = DateFormat.yMMMMEEEEd();

//     return MediaQuery.removePadding(
//       context: context,
//       removeTop: true,
//       child: GridView.count(
//           crossAxisCount: 2,
//           children: List.generate(bookings.length, (i) {
//             final b = bookings[i];
//             return GestureDetector(
//               onTap: () {
//                 showDialog(
//                   //   backgroundColor: Colors.white.withOpacity(0.7),
//                   context: context,
//                   builder: (context) {
//                     return Dialog(
//                       child: Padding(
//                         padding: const EdgeInsets.only(
//                             top: 15.0, left: 15.0, right: 15.0),
//                         child: Column(
//                           mainAxisSize: MainAxisSize.min,
//                           mainAxisAlignment: MainAxisAlignment.start,
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Center(
//                               child: Text('Booking Details',
//                                   style: TextStyle(
//                                     fontWeight: FontWeight.bold,
//                                     fontSize: 20,
//                                     color: Colors.blue[800],
//                                   )),
//                             ),
//                             Divider(color: Colors.black),
//                             Text('Workspace: ${b.workspaceId}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 20)),
//                             Text('City: ${b.city}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 16)),
//                             Text('Building: ${b.building}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 16)),
//                             Text('From: ${dateFormatLong.format(b.startDate)}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 16)),
//                             Text('To: ${dateFormatLong.format(b.endDate)}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 16)),
//                             Divider(color: Colors.black),
//                             Text(
//                                 'Workspace Owner: ${b.ownerFirstName} ${b.ownerLastName}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 16)),
//                             Text('Email: ${b.ownerEmail}',
//                                 style: TextStyle(
//                                     color: Colors.blue[800], fontSize: 16)),
//                             Divider(color: Colors.black),
//                             AspectRatio(
//                               aspectRatio: 3 / 2,
//                               child: PhotoView(
//                                 imageProvider: NetworkImage(
//                                     "https://icbcflexwork.me:8080/floorplans/${b.floorId}.jpg"),
//                               ),
//                             ),
//                             RaisedButton(
//                               color: Colors.red[800],
//                               child: Text('Withdraw booking',
//                                   style: TextStyle(color: Colors.white)),
//                               onPressed: () {},
//                             ),
//                             //   Row(
//                             //     mainAxisAlignment:
//                             //         MainAxisAlignment.spaceEvenly,
//                             //     children: <Widget>[
//                             //       Expanded(
//                             //         child: FlatButton(
//                             //           onPressed: () {
//                             //             showDialog(
//                             //                 context: context,
//                             //                 builder: (context) {
//                             //                   return PhotoView(
//                             //                     imageProvider: NetworkImage(
//                             //                         "https://icbcflexwork.me:8080/floorplans/${b.floorId}.jpg"),
//                             //                   );
//                             //                 });
//                             //           },
//                             //           child: Icon(Icons.map,
//                             //               color: Colors.blue[800]),
//                             //         ),
//                             //       ),
//                             //       Expanded(
//                             //         child: FlatButton(
//                             //           onPressed: () {},
//                             //           child:
//                             //               Icon(Icons.delete, color: Colors.red),
//                             //         ),
//                             //       ),
//                             //     ],
//                             //   )
//                           ],
//                         ),
//                       ),
//                     );
//                   },
//                 );
//               },
//               child: Padding(
//                 padding: const EdgeInsets.all(8.0),
//                 child: ClipRRect(
//                   borderRadius: BorderRadius.all(Radius.circular(20)),
//                   child: Container(
//                     color: Colors.pink.withOpacity(0.3),
//                     child: Column(
//                         mainAxisAlignment: MainAxisAlignment.center,
//                         children: [
//                           Padding(
//                             padding: const EdgeInsets.only(bottom: 8.0),
//                             child: Row(
//                               mainAxisAlignment: MainAxisAlignment.center,
//                               children: <Widget>[
//                                 Icon(
//                                   Icons.location_on,
//                                   color: Colors.white,
//                                   size: 15,
//                                 ),
//                                 Text(
//                                   " " + b.city,
//                                   style: TextStyle(
//                                       color: Colors.white,
//                                       fontWeight: FontWeight.bold),
//                                 ),
//                               ],
//                             ),
//                           ),
//                           Row(
//                             mainAxisAlignment: MainAxisAlignment.center,
//                             children: <Widget>[
//                               Icon(Icons.date_range,
//                                   color: Colors.white, size: 15),
//                               Text(" " + dateFormatShort.format(b.startDate),
//                                   style: TextStyle(
//                                       color: Colors.white,
//                                       fontWeight: FontWeight.bold)),
//                             ],
//                           ),
//                           Padding(
//                             padding: const EdgeInsets.only(top: 3.0),
//                             child: Row(
//                               mainAxisAlignment: MainAxisAlignment.center,
//                               children: <Widget>[
//                                 Icon(Icons.arrow_forward,
//                                     color: Colors.white, size: 15),
//                                 Text(" " + dateFormatShort.format(b.endDate),
//                                     style: TextStyle(
//                                         color: Colors.white,
//                                         fontWeight: FontWeight.bold)),
//                               ],
//                             ),
//                           ),
//                           Padding(
//                             padding: const EdgeInsets.only(top: 13.4),
//                             child: Text("View Details",
//                                 style: TextStyle(
//                                     color: Colors.white,
//                                     fontSize: 10,
//                                     decoration: TextDecoration.underline)),
//                           )
//                         ]),
//                   ),
//                 ),
//               ),
//             );
//           })),
//     );
//   }
// }

class _MyBookingsTabBarView extends StatelessWidget {
  final List<Booking> bookings;
  final bool isUpcoming;
  final Color color;
  static const double ICON_SIZE = 18;

  _MyBookingsTabBarView({this.bookings, this.isUpcoming, this.color});

  date(DateTime dateTime) {
    final format = DateFormat.MMMd();

    return Column(
      children: <Widget>[
        Text(
          weekdayAbbreviation(dateTime),
          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        Text(format.format(dateTime).toUpperCase()),
      ],
    );
  }

  datesPart(int index) {
    return Row(
      children: <Widget>[
        date(bookings[index].startDate),
        Icon(Icons.arrow_right),
        date(bookings[index].endDate),
      ],
    );
  }

  withdrawPart(int index, context) {
    if (isUpcoming) {
      return Row(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(right: 10.0),
            child: CupertinoButton(
              child: Icon(Icons.map),
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
                                "https://icbcflexwork.me:8080/floorplans/${bookings[index].floorId}.jpg"),
                          ),
                          aspectRatio: 3 / 2,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          OutlineButton(
              highlightedBorderColor: Colors.red,
              textColor: Colors.red[700],
              splashColor: Colors.red,
              onPressed: () {
                showDialog(
                    context: context,
                    barrierDismissible: false,
                    child: AlertDialog(
                        title: Text("Confirm Withdraw"),
                        content: Text(
                            "Are you sure you with to withdraw this booking? A notification email will be sent to the office owner"),
                        actions: <Widget>[
                          CupertinoButton(
                            child: Text("Withdraw",
                                style: TextStyle(color: Colors.red)),
                            onPressed: () {
                              BlocProvider.of<MyBookingsBloc>(context).add(
                                  MyBookingsDeleted(bookings[index].bookingId));
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
              child: Text("Withdraw")),
        ],
      );
    } else {
      return Container();
    }
  }

  cityAndOwnerPart(int index) {
    // handle owner edge cases
    final booking = bookings[index];
    final hasFirstName = booking.ownerFirstName != "";
    final hasLastName = booking.ownerLastName != "";

    var ownerRow;
    if (hasFirstName && hasLastName) {
      ownerRow = Row(children: <Widget>[
        Icon(Icons.person, size: 14),
        Text(booking.ownerFirstName + " " + booking.ownerLastName[0] + "."),
      ]);
    } else {
      ownerRow = Container();
    }

    return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(children: <Widget>[
            Icon(Icons.location_on, size: ICON_SIZE),
            Text(
              bookings[index].city,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ]),
          ownerRow
        ]);
  }

  buildingAndWorkspacePart(int index) {
    return Column(
      children: <Widget>[
        Row(children: <Widget>[Text("Building: " + bookings[index].building)]),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: <Widget>[
            Text("Workspace: "),
            Text(
              bookings[index].workspaceId,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ],
    );
  }

  bottomPart(int index) {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0),
      child: Row(
        children: <Widget>[
          Expanded(flex: 5, child: cityAndOwnerPart(index)),
          Expanded(flex: 6, child: buildingAndWorkspacePart(index)),
        ],
      ),
    );
  }

  topPart(int index, context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        datesPart(index),
        Spacer(),
        withdrawPart(index, context)
      ],
    );
  }

  noBookingsMessage() {
    return Column(children: <Widget>[
      Spacer(),
      Container(
          height: 200,
          child: RoundedCornerContainer(
              color: Colors.white.withOpacity(0.8),
              radius: 15,
              child: Center(
                  child: Padding(
                padding: const EdgeInsets.only(left: 12.0, right: 12.0),
                child: isUpcoming
                    ? Text(
                        "You have no upcoming bookings on record.\n\nTo make a booking, press Book Office on the bottom tab.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 16,
                            color: Colors.black,
                            fontWeight: FontWeight.bold))
                    : Text("You have no past bookings on record.",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.black)),
              )))),
      Spacer(),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return MediaQuery.removePadding(
      context: context,
      removeTop: true,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: RoundedCornerContainer(
          radius: 15,
          // Display no bookings message if none
          child: bookings.isEmpty
              ? noBookingsMessage()
              : ListView.builder(
                  itemCount: bookings.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Card(
                        color: color,
                        child: Padding(
                          padding: const EdgeInsets.only(
                              top: 8.0, bottom: 11.0, left: 13.0, right: 13.0),
                          child: Column(
                            children: <Widget>[
                              topPart(index, context),
                              bottomPart(index),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
        ),
      ),
    );
  }
}

class MyBookings extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      child: Stack(
        children: [
          BlocConsumer<MyBookingsBloc, MyBookingsState>(
            builder: (BuildContext context, state) {
              if (state is MyBookingsInitial ||
                  state is MyBookingsInProgress ||
                  state is MyBookingsDeleteInProgress) {
                return Center(
                    child: CircularProgressIndicator(
                  backgroundColor: Colors.white,
                ));
              } else if (state is MyBookingsFetchSuccess) {
                return Padding(
                  padding: const EdgeInsets.only(
                      top: MY_BOOKINGS_TOP_PADDING,
                      left: 8.0,
                      right: 8.0,
                      bottom: 8.0),
                  child: TabBarView(
                    children: <Widget>[
                      _MyBookingsTabBarView(
                          bookings: state.upcomingBookings,
                          color: Colors.white,
                          isUpcoming: true),
                      _MyBookingsTabBarView(
                          bookings: state.pastBookings,
                          color: Colors.grey,
                          isUpcoming: false),
                    ],
                  ),
                );
              } else if (state is MyBookingsFetchFailure) {
                return Center(
                  // TODO: implement recovery mechanism
                  child: Text("Could not fetch bookings"),
                );
              } else {
                return Center(
                  child: Text("Unexpected State Reached"),
                );
              }
            },
            listener: (BuildContext context, MyBookingsState state) {
              if (state is MyBookingsDeleteSuccess) {
                showSnackBar(context, "Booking successfully withdrawn",
                    backgroundColor: Colors.white, textColor: ICBC_BLUE);
              }
            },
          ),
          Padding(
            padding: const EdgeInsets.only(top: 78.0),
            child: Container(
              // color: Colors.black.withOpacity(0.3),
              child: TabBar(
                indicatorColor: ICBC_BLUE,
                tabs: [
                  Tab(
                    child: Text(
                      'Upcoming',
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                  Tab(
                    child: Text(
                      'Past',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      length: 2,
    );
  }
}
