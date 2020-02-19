////////////////////////////////////////////////////////////
/// Flex Work Common Functions for both Front and Back End
////////////////////////////////////////////////////////////

const BSB = require("binary-search-bounds")

exports.isAvailabilityHealthy = isAvailabilityHealthy;
exports.isDate = isDate;
exports.openDates = openDates;
exports.openDatesInRange = openDatesInRange;
exports.canBook = canBook;

/**
 * @param {any} availability
 * @returns true iff the availability
 * - has both a start date and end date
 * - start date <= end date
 * - has a bookings array
 * - the bookings each have a start and end date
 * - the bookings' start date is <= end date
 * - the bookings are all within bounds
 * - the bookings are chronologically sorted
 * - the bookings do not overlap
 */
function isAvailabilityHealthy(availability) {
  if (availability == null) {
    return false;
  }
  const start = availability.startDate;
  const end = availability.endDate;
  if (!(isDate(start) && isDate(end))) {
    return false;
  }

  if (start > end) {
    return false;
  }
  if (!Array.isArray(availability.bookings)) {
    return false;
  }
  let currEnd = new Date(0); // Jan 1, 1970
  for (const b of availability.bookings) {
    if (b == null) {
      return false;
    }
    const bStart = b.startDate;
    const bEnd = b.endDate;
    if (!(isDate(bStart) && isDate(bEnd))) {
      return false;
    }
    if (bStart > bEnd) {
      return false;
    }
    if (bStart < start || bEnd > end) {
      return false;
    }
    if (bStart <= currEnd) {
      return false;
    }
    currEnd = bEnd;
  }
  return true;
}

/**
 * @param {any} obj 
 * @returns whether the obj is a JavaScript Date
 */
function isDate(obj) {
  if (obj == null) {
    return false;
  }
  // https://stackoverflow.com/questions/2831345/is-there-a-way-to-check-if-a-variable-is-a-date-in-javascript
  return Object.prototype.toString.call(obj) === "[object Date]";
}

/**
 * @param availability an availability with its chronologically sorted list of bookings
 * @returns an array of single days of availability
 *
 * Helper function for front end showing of availabilities
 */
function openDates(availability) {
  // If there are no bookings, then all of the dates are open dates
  if (availability.bookings.length === 0) {
    return allDaysInRange(availability.startDate, availability.endDate);
  }

  const dates = [];
  let curr = copyDate(availability.startDate);

  // Go through the bookings array sorted by start date
  for (const b of availability.bookings) {
    while (curr < b.startDate && curr <= availability.endDate) {
      // add curr to the list of open dates if it's before the current booking's start
      dates.push(curr);
      // set curr to the next day
      curr = nextDay(curr);
    }
    // set curr to the day after the current booking's end
    curr = nextDay(b.endDate);
  }
  while (curr <= availability.endDate) {
    dates.push(curr);
    curr = nextDay(curr);
  }
  return dates;
}

/**
 * @param {any} availability an availability with its chronologically sorted bookings
 * @param {Date} rangeStart
 * @param {Date} rangeEnd
 * @returns an array of single dates of availability from rangeStart to rangeEnd, inclusive
 *
 * Helper function for front end showing of availabilities
 */
function openDatesInRange(availability, rangeStart, rangeEnd) {
  const restrictedAvailability = {
    startDate: rangeStart < availability.startDate ? availability.startDate : rangeStart,
    endDate: rangeEnd > availability.endDate ? availability.endDate : rangeEnd,
    bookings: availability.bookings
  }

  return openDates(restrictedAvailability);
}

/**
 * @param {any} availability an availability and its current bookings
 * @param {any} booking a potential booking
 * @returns {boolean} whether the booking can be made in the availability
 *
 * Helper function for front end and back end validation
 */
function canBook(availability, booking) {
  // ensure the booking's bounds are within the availability's
  if (booking.startDate >= availability.startDate && booking.endDate <= availability.endDate) {
    if (availability.bookings.length === 0) {
      return true;
    }
    // find the latest booking that would happen before this booking
    // (using binary-search-bounds)
    let idx = BSB.lt(availability.bookings);
    if (idx === -1) {
      // no present bookings have a start date before proposed booking
      // the booking is OK as long as the first booking starts after
      // proposed booking's end
      return (availability.bookings[0].startDate > booking.endDate);
    }
    if (availability.bookings[idx].endDate >= booking.startDate) {
      return false;
    }
    if (idx !== availability.bookings.length - 1) {
      // also check the next booking
      ++idx;
      if (availability.bookings[idx].startDate <= booking.endDate) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

//////////////////////////////////////////////
/// Helper functions for exported functions
//////////////////////////////////////////////

/**
 * @param {Date} currentDay
 * @returns {Date} a new Date object of the next day
 */
function nextDay(currentDay) {
  return new Date(currentDay.getTime() + 1000 * 60 * 60 * 24);
}

function copyDate(date) {
  const copy = new Date(date.valueOf());
  copy.setHours(0, 0, 0, 0); // Remove hours, minutes, seconds, milliseconds, in case there are any
  return copy;
}

/**
 * @param {Date} start the first day in the range
 * @param {Date} end the last day in the range (inclusive)
 * @returns {[Date]} an array of: every single Date, from start to end, inclusive
 */
function allDaysInRange(start, end) {
  const startCopy = copyDate(start);
  const endCopy = copyDate(end);
  const days = [];
  let curr = new Date(startCopy.valueOf());
  while (curr <= endCopy) {
    days.push(curr);
    curr = nextDay(curr);
  }
  return days;
}
