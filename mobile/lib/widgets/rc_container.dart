import 'package:flutter/cupertino.dart';

class RoundedCornerContainer extends StatelessWidget {
  final double radius;
  final Widget child;
  final Color color;

  const RoundedCornerContainer({this.radius, this.child, this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
        child: child,
        decoration: BoxDecoration(
            color: color, borderRadius: BorderRadius.circular(radius)));
  }
}
