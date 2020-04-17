import 'package:FlexWork/pages/book_office.dart';
import 'package:FlexWork/pages/lend_office.dart';
import 'package:FlexWork/pages/my_bookings.dart';
import 'package:FlexWork/util/theme.dart';
import 'package:FlexWork/widgets/prevent_exit.dart';
import 'package:flutter/material.dart';

/// Coordinates all user UI after login screen
class Coordinator extends StatefulWidget {
  final int staffId;

  const Coordinator({@required this.staffId});

  @override
  _CoordinatorState createState() => _CoordinatorState();
}

enum _Page { MY_BOOKINGS, LEND_OFFICE, BOOK_OFFICE }
const MY_BOOKINGS_COLOR = Colors.blue;
const LEND_OFFICE_COLOR = Colors.green;
const BOOK_OFFICE_COLOR = Colors.cyan;
const INACTIVE_BUTTON_COLOR = Colors.grey;
const BACKGROUND_IMAGE = "images/vancouver.jpg";

class _CoordinatorState extends State<Coordinator> {
  var _currentPage = _Page.MY_BOOKINGS;

  circleColor(_Page page) {
    if (page == _currentPage) {
      return ICBC_BLUE;
    } else {
      return Colors.white;
    }
  }

  setCurrentPageToMyBookings() {
    setState(() {
      _currentPage = _Page.MY_BOOKINGS;
    });
  }

  iconColor(_Page page) {
    if (page == _currentPage) {
      return Colors.white;
    } else {
      return ICBC_BLUE;
    }
  }

  appBarSubtitle() {
    switch (_currentPage) {
      case _Page.MY_BOOKINGS:
        return "My Bookings";
      case _Page.LEND_OFFICE:
        return "Lend Office";
      case _Page.BOOK_OFFICE:
        return "Book Office";
    }
  }

  body() {
    var child;
    switch (_currentPage) {
      case _Page.MY_BOOKINGS:
        child = MyBookings();
        break;
      case _Page.LEND_OFFICE:
        child = LendOffice();
        break;
      case _Page.BOOK_OFFICE:
        child = BookOffice(
            staffId: widget.staffId,
            resetPageCallback: setCurrentPageToMyBookings);
        break;
    }
    return child;
  }

  bottomNavBar() {
    return Container(
      height: 75,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          bottomTab(
            page: _Page.MY_BOOKINGS,
            icon: Icons.list,
            text: 'My Bookings',
          ),
          bottomTab(
              page: _Page.LEND_OFFICE,
              icon: Icons.favorite,
              text: 'Lend Office'),
          bottomTab(
              page: _Page.BOOK_OFFICE,
              icon: Icons.bookmark,
              text: 'Book Office'),
        ],
      ),
    );
  }

  bottomTab({_Page page, IconData icon, String text}) {
    return Expanded(
      flex: 1,
      child: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: () => setState(() => _currentPage = page),
        child: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              clipOval(icon: icon, page: page),
              Padding(
                padding: const EdgeInsets.only(top: 8.0),
                child: Text(text, style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  clipOval({IconData icon, _Page page}) {
    return ClipOval(
      child: Material(
        color: circleColor(page), // button color
        child: InkWell(
          splashColor: iconColor(page), // inkwell color
          child: SizedBox(
            width: 35,
            height: 35,
            child: Icon(
              icon,
              color: iconColor(page),
              size: 20,
            ),
          ),
          onTap: () => setState(() => _currentPage = page),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PreventExit(
      Scaffold(
        extendBodyBehindAppBar: true,
        appBar: AppBar(
          elevation: 0,
          title: Center(
            child: Stack(
              children: <Widget>[
                Image(image: AssetImage("images/new_logo.png"), height: 30.0),
                Center(
                  child: Text(
                    appBarSubtitle(),
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          backgroundColor: Colors.white.withOpacity(0.0),
        ),
        body: Container(
          decoration: BoxDecoration(
            color: Colors.black,
            image: DecorationImage(
              image: AssetImage(BACKGROUND_IMAGE),
              colorFilter: ColorFilter.mode(
                  Colors.black.withOpacity(0.6), BlendMode.dstATop),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              Expanded(
                flex: 1,
                child: body(),
              ),
              bottomNavBar(),
            ],
          ),
        ),
      ),
    );
  }
}
