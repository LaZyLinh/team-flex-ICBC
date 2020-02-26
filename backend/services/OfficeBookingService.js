/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Availabilities = require('../db/availabilities');
const Booking = require('../db/bookings');

class OfficeBookingService {

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
          let bookerEmail = Object.values(JSON.parse(JSON.stringify(booker)))[0][0];

          let workspaceOwner = await Booking.getOwnerEmail(id);
          let workspaceOwnerEmail = Object.values(JSON.parse(JSON.stringify(workspaceOwner)))[0][0];

          const EmailService = require("./EmailService");
          const emailService = new EmailService();

          let booking = await Booking.getByBookingId(id);
          console.log(booking[0]);
          emailService.sendEmailDeleteBookingBooker(bookerEmail.Email, booking[0]);
          emailService.sendEmailDeleteBookingBooker(workspaceOwnerEmail.Email, booking[0]);

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
          // send email notification to booker and workspace owner
          // stop timer
          resolve(Service.successResponse(''));
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

  /**
   * Finds top availabilities, not filtered
   *
   * amount BigDecimal 
   * returns List
   **/
  static getTopAvailabilities({ amount }) {
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

  /**
   * Temporarily lock a Booking as the User enters confirmation page
   *
   * availabilityId Integer 
   * staffId Integer 
   * startDate date 
   * endDate date 
   * returns BookingSummary
   **/
  static lockBooking({ availabilityId, staffId, startDate, endDate }) {
    return new Promise(
      async (resolve, reject) => {
        try {
          console.log('in lockBooking');
          Availabilities.getByAvailabilityId(availabilityId).then((availability) => {
            let a = Object.values(JSON.parse(JSON.stringify(availability)))[0][0];
            if (startDate >= a.StartDate.slice(0, 10) && endDate <= a.EndDate.slice(0, 10)) {
              console.log('booking is valid');
              // create booking
              Booking.insertBooking(availabilityId, staffId, startDate, endDate, false).then(() => {
                Booking.getBookingbyAvailStaffDates(availabilityId, staffId, startDate, endDate).then((booking) => {
                  console.log(booking);
                  resolve(booking[0]);
                });
              });
            } else {
              console.log('booking is not valid');
              reject(new Error(403));
            }
          });
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

}

module.exports = OfficeBookingService;
