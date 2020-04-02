/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Availabilities = require('../db/availabilities');
const Booking = require('../db/bookings');
const { makePackages } = require("./PackageMaker");

// Added for direct usage of knex
const knex = require("../db/mysqlDB");
const knexHelper = async (query) => (await knex.raw(query))[0];
// flexwork-common helper functions
const FWC = require("flexwork-common");
// How many availabilities in the DB to dig for open ones
// The ones that we dig might not be open, and the general use case is to return the top 10 open ones
const LIMIT = 500;
const MILLIS_PER_DAY = 1000 * 60 * 60 * 24
const UNCONFIRMED = 0


class OfficeBookingService {

  static makeFloor(floorId, floorNo, prefix, city, building) {
    return { floorId, floorNo, prefix, city, building };
  }

  static async getFloors({ floorId, location }, _knex = knex) {
    let query;
    if (floorId) {
      query = `SELECT * from floor WHERE FloorId=${floorId}`
    } else if (location) {
      query = `SELECT * from floor WHERE City='${location}'`
    } else {
      query = `SELECT * from floor`
    }
    return (await _knex.raw(query))[0].map(f => OfficeBookingService.makeFloor(f.FloorId, f.FloorNo, f.Location, f.City, f.Building))
  }

  /**
      * Cancel an upcoming Booking
      *
      * id Integer ID of the Booking to delete
      * no response value expected for this operation
      **/
  static cancelBooking({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          // send email notification that this booking is about to be deleted to booker and workspace owner
          let booker = await Booking.getUserEmail(id);
          if (booker[0].length === 0) {
            console.log("/bookings DELETE -> cancelBooking -> 400 ID doesn't exist");
            throw { message: "ID doesn't exist", status: 400 }
          }
          let bookerEmail = booker[0][0];

          let workspaceOwner = await Booking.getOwnerEmail(id);
          let shouldEmailOwner = true;
          if (workspaceOwner[0].length === 0) {
            shouldEmailOwner = false;
          }
          let workspaceOwnerEmail;
          if (shouldEmailOwner) {
            workspaceOwnerEmail = Object.values(JSON.parse(JSON.stringify(workspaceOwner)))[0][0];
          }

          const EmailService = require("./EmailService");
          const emailService = new EmailService();

          let booking = JSON.parse(JSON.stringify(await Booking.getByBookingId(id)))[0][0];
          let bookingInfo = {
            startDate: new Date(booking.StartDate).toLocaleDateString(),
            endDate: new Date(booking.EndDate).toLocaleDateString(),
            workspaceId: booking.WorkspaceId
          };

          emailService.sendEmailDeleteBookingBooker(bookerEmail.Email, bookingInfo);
          if (shouldEmailOwner) {
            emailService.sendEmailDeleteBookingLender(workspaceOwnerEmail.Email, bookingInfo);
          }

          await Booking.deleteBooking(id);
          resolve('200');
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 403,
          ));
        }
      },
    );
  }

  /**
   * Confirm a temporarily locked Booking
   *
   * bookingId Integer 
   * returns BookingSummary 
   **/
  static createBooking({ bookingId }) {
    return new Promise(
      async (resolve) => {
        try {
          await Booking.confirmBooking(bookingId);

          let booker = await Booking.getUserEmail(bookingId);
          if (booker[0].length === 0) {
            console.log("/bookings DELETE -> cancelBooking -> 400 ID doesn't exist");
            throw { message: "ID doesn't exist", status: 400 }
          }
          let bookerEmail = Object.values(JSON.parse(JSON.stringify(booker)))[0][0];

          let workspaceOwner = await Booking.getOwnerEmail(bookingId);
          const thereIsAnOwner = workspaceOwner[0].length > 0;
          let workspaceOwnerEmail;
          if (thereIsAnOwner) {
            workspaceOwnerEmail = Object.values(JSON.parse(JSON.stringify(workspaceOwner)))[0][0];
          }

          let booking = JSON.parse(JSON.stringify(await Booking.getByBookingId(bookingId)))[0][0];
          let bookingInfo = {
            startDate: new Date(booking.StartDate).toLocaleDateString(),
            endDate: new Date(booking.EndDate).toLocaleDateString(),
            workspaceId: booking.WorkspaceId
          };

          const EmailService = require("./EmailService");
          const emailService = new EmailService();

          console.log(booking[0]);
          console.log(bookingInfo);
          emailService.sendEmailConfirmBookingBooker(bookerEmail.Email, bookingInfo);
          if (thereIsAnOwner) {
            emailService.sendEmailConfirmBookingLender(workspaceOwnerEmail.Email, bookingInfo);
          }
          // stop timer !!!
          resolve(bookingInfo);
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 403,
          ));
        }
      },
    );
  }

  static async getPackages({ startDate, endDate, floorIds, features }) {
    return await makePackages({ startDate, endDate, desiredFloors: floorIds, requiredFeatures: features })
  }

  /**
   * Finds Availabilities, filtered by various properties, of which startDate and endDate are required
   *
   * startDate date The first date of the search range
   * endDate date The last date of the search range
   * location String Office building location (optional)
   * floor String Floor of building (optional)
   * features List Features to filter by (optional)
   * returns List
   * example: http://localhost:6000/availabilities?startDate=2019-04-01&endDate=2021-04-04&features='private office'&location='4126 Macdonald St,'
   **/
  static getAvailabilities({ startDate, endDate, location, floor, features }) {
    return new Promise(
      async (resolve) => {
        try {
          Availabilities.getByDate(startDate, endDate, location, floor, features).then(obj => {
            let promList = [];
            obj[0].forEach(ele => {
              promList.push(Service.makeBookingPromise(ele));
            });
            Promise.all(promList).then((pres) => {
              resolve(pres);
            })
          }).catch(err => {
            throw err;
          })

        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Finds Bookings by User ID
   *
   * staffId Integer The ID of the User
   * returns List
   **/
  static getBookingsByUserID({ staffId }) {
    return new Promise(
      async (resolve) => {
        try {
          Booking.getByStaffId(staffId).then(obj => {
            resolve(obj[0]);
          }).catch(err => {
            throw err;
          })
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * A list of all the location names
   *
   * returns List
   **/
  static getLocations() {
    return new Promise(
      async (resolve) => {
        try {
          const queryResults = (await knex.raw("select distinct city from floor"))[0];
          // console.log(queryResults);
          const cities = queryResults.map(rdp => rdp.city);
          // console.log(cities);
          console.log("locations /GET -> getLocations -> 200 OK");
          // resolve(Service.successResponse(cities));
          resolve(cities);
        } catch (e) {
          console.error("ERROR: locations /GET -> getLocations");
          resolve(Service.rejectResponse(
            e.message || 'Unknown Error (probably MySQL DB error)',
            e.status || 405,
          ));
        }
      },
    );
  }

  static makeBookingHelper(bookingId, startDate, endDate, staffId, email, firstName, lastName, department, valid) {
    return {
      bookingId,
      startDate,
      endDate,
      user: {
        staffId,
        email,
        firstName,
        lastName,
        department,
        valid
      }
    };
  }

  static makeBooking(row) {
    return OfficeBookingService.makeBookingHelper(row.BookingId, row.BStartDate, row.BEndDate, row.BStaffId, row.Email, row.FirstName, row.LastName, row.Department, row.Valid);
  }

  static makeAvailabilityHelper(availabilityId, startDate, endDate, workspaceId, workspaceName, floorId, location) {
    return {
      availabilityId,
      startDate,
      endDate,
      workspaceId,
      workspaceName,
      floorId,
      location,
      features: [],
      bookings: []
    }
  }

  static makeAvailability(row) {
    return OfficeBookingService.makeAvailabilityHelper(row.AvailabilityId, row.AStartDate, row.AEndDate, row.WorkspaceId, row.WorkspaceName, row.FloorNo, row.City);
  }

  static hasOpening(availability) {
    availability.bookings.sort((b1, b2) => b1.startDate - b2.startDate);
    return FWC.openDates(availability).length > 0;
  }

  /**
   * Finds top availabilities, not filtered
   *
   * amount BigDecimal 
   * returns List
   **/
  static getTopAvailabilities({ amount }) {
    if (!amount) {
      console.log("availabilities/top GET -> getTopAvailabilities -> invalid amount, using 10 instead.");
      amount = 10;
    }
    return new Promise(
      async (resolve) => {
        try {
          // TODO: set this complex query as a View and/or Stored Procedure in MySQL
          const query = `select * from
                        (select
                        a.AvailabilityId,
                        a.StartDate as AStartDate, a.EndDate as AEndDate,
                        b.BookingId,
                        a.WorkspaceId,
                        b.StartDate as BStartDate, b.EndDate as BEndDate,
                        b.StaffId as BStaffId
                        from (select * from availability limit ${LIMIT}) a
                        left join booking b
                        on a.AvailabilityId = b.AvailabilityId) ab
                        natural join workspace
                        natural join workspaceFeature
                        natural join feature
                        natural join floor
                        left join user u on BStaffId = u.StaffId
                        order by AvailabilityId`;
          const rows = (await knex.raw(query))[0];
          //console.log(rows);
          let currAvailabilityId = -1;
          let currFeatureIds = [];
          const availabilities = [];
          for (const row of rows) {
            // The rows are in sorted AvailabilityId, so rows for the same availability are consecutive
            // If the next row's AvailabilityId the same as the curr one, then only create
            // a new booking and push it into curr's bookings array
            if (row.AvailabilityId === currAvailabilityId) {
              // Push booking into current availability in response;
              const booking = OfficeBookingService.makeBooking(row);
              availabilities[availabilities.length - 1].bookings.push(booking);

              // set up features
              if (row.FeatureId !== null && !currFeatureIds.includes(row.FeatureId)) {
                availabilities[availabilities.length - 1].features.push(row.FeatureName);
                currFeatureIds.push(row.FeatureId);
              }
            } else {
              // update index;
              currAvailabilityId = row.AvailabilityId;
              const availability = OfficeBookingService.makeAvailability(row);
              // console.log(availability);
              availabilities.push(availability);
              if (row.BookingId != null) {
                const booking = OfficeBookingService.makeBooking(row);
                availabilities[availabilities.length - 1].bookings.push(booking);
              }

              // set up features
              if (row.FeatureId !== null && !currFeatureIds.includes(row.FeatureId)) {
                availabilities[availabilities.length - 1].features.push(row.FeatureName);
                currFeatureIds.push(row.FeatureId);
              }
            }
          }
          const response = [];
          for (const availability of availabilities) {
            if (OfficeBookingService.hasOpening(availability)) {
              response.push(availability);
              if (response.length === amount) {
                break;
              }
            }
          }
          console.log(`getAvailabilities/top/${amount} GET -> getTopAvaliabilities -> 200 OK`);
          // resolve(Service.successResponse(response));
          resolve(response);
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  // helper
  static doesEncompass(availabilityStartMillis, availabilityEndMillis, bookingStartMillis, bookingEndMillis) {
    return availabilityStartMillis <= bookingStartMillis && availabilityEndMillis >= bookingEndMillis
  }

  // helper
  static hasOverlap(b1start, b1end, b2start, b2end) {
    // there is no overlap if 1 begins after the other ends
    const noOverlap = b1start > b2end || b2start > b1end
    return !noOverlap
  }

  // helper
  static dateToUnixDay(jsdate) {
    const millis = jsdate.getTime()
    return Math.floor(millis / MILLIS_PER_DAY);
  }

  // helper
  static strToUnixDay(isodatestr) {
    const millis = Date.parse(isodatestr);
    return Math.floor(millis / MILLIS_PER_DAY);
  }

  /**
   * Temporarily lock a Booking as the User enters confirmation page
   *
   * availabilityId Integer 
   * staffId Integer 
   * startDate date 
   * endDate date 
   * returns BookingSummary
   **/
  static async lockBooking({ availabilityId, staffId, startDate, endDate }) {
    try {
      const bStart = this.strToUnixDay(startDate);
      const bEnd = this.strToUnixDay(endDate);
      const availabilities = (await Availabilities.getByAvailabilityId(availabilityId))[0]
      if (availabilities.length === 0) {
        throw ({
          message: `Availability doesn't exist, ID: ${availabilityId}`,
          status: 400
        })
      }
      const a = availabilities[0] // the found availabiliity
      const aStart = this.dateToUnixDay(a.StartDate)
      const aEnd = this.dateToUnixDay(a.EndDate)

      if (!this.doesEncompass(aStart, aEnd, bStart, bEnd)) {
        throw ({
          message: `Availability exists. Booking's date range is too big for it though: Availability: ${JSON.stringify(a)}`,
          status: 400
        })
      }
      const bookingsQuery = `SELECT * FROM booking WHERE AvailabilityId=${availabilityId}`
      const bookings = await knexHelper(bookingsQuery)
      for (const b of bookings) {
        const existingBStart = this.dateToUnixDay(b.StartDate)
        const existingBEnd = this.dateToUnixDay(b.EndDate)
        if (this.hasOverlap(existingBStart, existingBEnd, bStart, bEnd)) {
          throw ({
            message: `There is a overlap with existing booking: ${JSON.stringify(b)}`,
            status: 400
          })
        }
      }
      // create booking
      const createBookingQuery =
        `INSERT INTO booking (Confirmed, StartDate, EndDate, StaffId, AvailabilityId, WorkspaceId)
         VALUES (${UNCONFIRMED}, '${startDate}', '${endDate}', ${staffId}, 9000, '${a.WorkspaceId}')`;
      try {
        const result = await knexHelper(createBookingQuery);
        return {
          bookingId: result.InsertId,
          startDate, endDate,
        }
      } catch (e) {
        throw ({
          message: "Unexpected DB error: " + e.message,
          status: 500,
        })
      }
    } catch (e) {
      return {
        message: e.message || 'Unknown Error, call the Avengers',
        status: e.status || 500,
        error: true
      }
    }
  }


  /**
   * Unlocks a Booking before the 20 minute automatic unlock
   * For when the User navigates away from the confirmation page or closes the browser tab.
   *
   * id Integer ID of the Booking to delete
   * no response value expected for this operation
   **/
  static unlockBooking({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static async getAllFeatures() {
    try {
      const rows = (await knex.raw(`select distinct FeatureName from feature`))[0];
      return Service.successResponse(rows.map(row => row.FeatureName));
    }
    catch (err) {
      return Service.rejectResponse(err, 403);
    }
  }

  static async getFeaturesByAvailabilityId(availabilityId) {
    try {
      const query = `select distinct f.FeatureName from availability a
                    inner join workspace w on a.WorkspaceId = w.WorkspaceId
                    inner join workspacefeature wf on w.WorkspaceId = wf.WorkspaceId
                    inner join feature f on f.FeatureId = wf.FeatureId
                    where a.AvailabilityId = ${availabilityId}`;
      const rows = (await knex.raw(query))[0];
      return Service.successResponse(rows.map(row => row.FeatureName));
    }
    catch (err) {
      return Service.rejectResponse(err, 403);
    }
  }

  static async getFeaturesByWorkspaceId(workspaceId) {
    try {
      const query = `select distinct f.FeatureName from workspace w
                    inner join workspacefeature wf on w.WorkspaceId = wf.WorkspaceId
                    inner join feature f on f.FeatureId = wf.FeatureId
                    where w.WorkspaceId = '${workspaceId}'`
      const rows = (await knex.raw(query))[0];
      return Service.successResponse(rows.map(row => row.FeatureName));
    }
    catch (err) {
      return Service.rejectResponse(err, 403);
    }
  }


  /**
   * Get features by availabilityId, workspaceId, or all features if no params
   *
   * availabilityId BigDecimal  (optional)
   * workspaceId String  (optional)
   * returns List
   **/
  static async getFeatures({ availabilityId, workspaceId }) {
    if (!availabilityId && !workspaceId) {
      return OfficeBookingService.getAllFeatures();
    }
    if (availabilityId) {
      return OfficeBookingService.getFeaturesByAvailabilityId(availabilityId);
    }
    if (workspaceId) {
      return OfficeBookingService.getFeaturesByWorkspaceId(workspaceId);
    }
  }

}

module.exports = OfficeBookingService;
