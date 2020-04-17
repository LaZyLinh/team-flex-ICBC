import 'package:flutter/material.dart';

showSnackBar(BuildContext context, String text, {backgroundColor, textColor}) {
  Scaffold.of(context).showSnackBar(
    SnackBar(
      backgroundColor: backgroundColor,
      content: Container(
        height: 70,
        child: Text(
          text,
          style: TextStyle(color: textColor, fontSize: 18),
        ),
      ),
    ),
  );
}
