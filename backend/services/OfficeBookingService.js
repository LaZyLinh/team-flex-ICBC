/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Availabilities = require('../db/availabilities');
const LandingService = require('./OfficeLendingService')

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
   * Confirm a temporarily locked Booking
   *
   * bookingId Integer 
   * returns BookingSummary
   **/
  static createBooking({ bookingId }) {
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
