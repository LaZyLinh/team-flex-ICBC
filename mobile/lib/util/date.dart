const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
const PACIFIC_OFFSET_MILLIS = 1000 * 60 * 60 * 7;

DateTime todayMidnight() {
  final nowMillis = DateTime.now().millisecondsSinceEpoch;
  final midnightMillis = (nowMillis / MILLIS_PER_DAY).floor() * MILLIS_PER_DAY +
      PACIFIC_OFFSET_MILLIS -
      MILLIS_PER_DAY;
  return DateTime.fromMillisecondsSinceEpoch(midnightMillis);
}

bool overlaps(DateTime start1, DateTime end1, DateTime start2, DateTime end2) {
  return !(end1.isBefore(start2) || end2.isBefore(start1));
}

String weekdayAbbreviation(DateTime dateTime) {
  switch (dateTime.weekday) {
    case 1:
      return "M";
    case 2:
      return "Tu";
    case 3:
      return "W";
    case 4:
      return "Th";
    case 5:
      return "F";
    case 6:
      return "Sa";
    case 7:
      return "Su";
    default:
      return "??";
  }
}
