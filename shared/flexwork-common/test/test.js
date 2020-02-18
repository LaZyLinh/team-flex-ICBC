"use strict"

var tape = require("tape")
var fw = require("../FlexWorkCommonFunctions.js")

const availabilityWithSomeBookings = {
  startDate: new Date("2020-2-15"),
  endDate: new Date("2020-2-26"),
  bookings: [
    {
      startDate: new Date("2020-2-17"),
      endDate: new Date("2020-2-19")
    },
    {
      startDate: new Date("2020-2-20"),
      endDate: new Date("2020-2-20")
    },
    {
      startDate: new Date("2020-2-24"),
      endDate: new Date("2020-2-25")
    }
  ]
}

const singleDayAvailability = {
  startDate: new Date("2020-2-12"),
  endDate: new Date("2020-2-12"),
  bookings: []
}

const availabilityWithoutBookings = {
  startDate: new Date("2020-2-12"),
  endDate: new Date("2020-2-15"),
  bookings: []
}

const unavailable = {
  startDate: new Date("2020-2-12"),
  endDate: new Date("2020-2-16"),
  bookings: [
    {
      startDate: new Date("2020-2-12"),
      endDate: new Date("2020-2-15"),
    },
    {
      startDate: new Date("2020-2-16"),
      endDate: new Date("2020-2-16"),
    }
  ]
}

tape("isDate", function (t) {
  t.true(fw.isDate(new Date()));
  t.true(fw.isDate(new Date(12345678)));
  t.false(fw.isDate(null));
  t.false(fw.isDate([new Date()]));
  t.false(fw.isDate(1));
  t.false(fw.isDate("a date"));
  t.end();
});

tape("isAvailabilityHealthy", function (t) {
  t.true(fw.isAvailabilityHealthy(availabilityWithSomeBookings));
  t.true(fw.isAvailabilityHealthy(availabilityWithoutBookings));
  t.true(fw.isAvailabilityHealthy(singleDayAvailability));
  t.true(fw.isAvailabilityHealthy(unavailable));
  t.false(fw.isAvailabilityHealthy(null));
  t.false(fw.isAvailabilityHealthy(1234));
  t.false(fw.isAvailabilityHealthy({
    startDate: new Date("2020-2-15"),
    endDate: new Date("2020-2-14"),
    bookings: []
  }));
  t.false(fw.isAvailabilityHealthy({
    startDate: new Date("2020-2-15"),
    endDate: new Date("2020-2-18"),
    bookings: [
      {
        startDate: new Date("2020-2-14"),
        endDate: new Date("2020-2-16")
      }
    ]
  }));

  t.false(fw.isAvailabilityHealthy({
    startDate: new Date("2020-2-15"),
    endDate: new Date("2020-2-18"),
    bookings: [
      {
        startDate: new Date("2020-2-16"),
        endDate: new Date("2020-2-19")
      }
    ]
  }));

  t.false(fw.isAvailabilityHealthy({
    startDate: new Date("2020-2-15"),
    endDate: new Date("2020-2-18"),
    bookings: [
      {
        startDate: new Date("2020-2-15"),
        endDate: new Date("2020-2-16")
      },
      {
        startDate: new Date("2020-2-16"),
        endDate: new Date("2020-2-17")
      },

    ]
  }));

  t.false(fw.isAvailabilityHealthy({
    startDate: new Date("2020-2-15"),
    endDate: new Date("2020-2-18"),
    bookings: [
      {
        startDate: new Date("2020-2-18"),
        endDate: new Date("2020-2-18")
      },
      {
        startDate: new Date("2020-2-16"),
        endDate: new Date("2020-2-16")
      },

    ]
  }));

  t.end();
});

tape("openDates", function (t) {
  let expectedOpenDates = [
    new Date("2020-2-15"),
    new Date("2020-2-16"),
    new Date("2020-2-21"),
    new Date("2020-2-22"),
    new Date("2020-2-23"),
    new Date("2020-2-26"),
  ];

  let actualOpenDates = fw.openDates(availabilityWithSomeBookings);

  t.equal(actualOpenDates.length, expectedOpenDates.length)
  for (let i = 0; i < expectedOpenDates.length; ++i) {
    const expected = expectedOpenDates[i];
    const actual = actualOpenDates[i];
    t.equal(actual.getFullYear(), expected.getFullYear());
    t.equal(actual.getMonth(), expected.getMonth())
    t.equal(actual.getDate(), expected.getDate())
  }

  // Should return every single day if there is no booking on it
  actualOpenDates = fw.openDates(singleDayAvailability);
  t.equal(actualOpenDates.length, 1);
  t.equal(actualOpenDates[0].getFullYear(), singleDayAvailability.startDate.getFullYear());
  t.equal(actualOpenDates[0].getMonth(), singleDayAvailability.startDate.getMonth());
  t.equal(actualOpenDates[0].getDate(), singleDayAvailability.startDate.getDate());


  // Should return every single day if there is no booking on it
  expectedOpenDates = [
    new Date("2020-2-12"),
    new Date("2020-2-13"),
    new Date("2020-2-14"),
    new Date("2020-2-15"),
  ];

  actualOpenDates = fw.openDates(availabilityWithoutBookings);
  t.equal(actualOpenDates.length, expectedOpenDates.length);
  for (let i = 0; i < expectedOpenDates.length; ++i) {
    const expected = expectedOpenDates[i];
    const actual = actualOpenDates[i];
    t.equal(actual.getFullYear(), expected.getFullYear());
    t.equal(actual.getMonth(), expected.getMonth())
    t.equal(actual.getDate(), expected.getDate())
  }

  // Should return empty array if there is no opening
  t.equal(fw.openDates(unavailable).length, 0);

  t.end()
})

tape("canBook", function (t) {
  t.false(fw.canBook(unavailable,
    { startDate: new Date("2020-2-13"), endDate: new Date("2020-2-13") }));

  t.true(fw.canBook(
    availabilityWithSomeBookings, { startDate: new Date("2020-2-15"), endDate: new Date("2020-2-16") }
  ))

  t.end()
})


tape("openDatesInRange", function (t) {
  const startDate = new Date("2020-2-15")
  const endDate = new Date("2020-2-21")

  const expectedOpenDates = [
    new Date("2020-2-15"),
    new Date("2020-2-16"),
    new Date("2020-2-21"),
  ];

  const actualOpenDates = fw.openDatesInRange(availabilityWithSomeBookings,
    startDate, endDate);



  t.equal(actualOpenDates.length, expectedOpenDates.length);
  for (let i = 0; i < expectedOpenDates.length; ++i) {
    const expected = expectedOpenDates[i];
    const actual = actualOpenDates[i];
    t.equal(actual.getFullYear(), expected.getFullYear());
    t.equal(actual.getMonth(), expected.getMonth())
    t.equal(actual.getDate(), expected.getDate())
  }

  t.end()
})
