import 'package:flutter/material.dart';

/// Wrapper Widget for interception back button to create exit dialog
class PreventExit extends StatelessWidget {
  final Widget child;

  PreventExit(this.child);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        child: child,
        onWillPop: () {
          return showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text(
                "Exit Flex Work?",
              ),
              actions: <Widget>[
                FlatButton(
                  onPressed: () => Navigator.pop(context, true),
                  child: Icon(Icons.check),
                ),
              ],
            ),
          );
        });
  }
}
