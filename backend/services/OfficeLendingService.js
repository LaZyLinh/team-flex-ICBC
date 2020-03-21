/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Availabilities = require('../db/availabilities');
const Bookings = require('../db/bookings');
const Floors = require('../db/floors');
const OfficeBookingService = require('./OfficeBookingService');


class OfficeLendingService {

  /**
     * Cancel an Availability
     *
     * id Integer ID of the Availability to delete
     * no response value expected for this operation
     **/
  static async cancelAvailability({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          // query all bookings related to this availability
          let bookings = await Bookings.getByAvailabilityId(id);
          console.log('bookings');
          console.log(bookings);
          // bookings[0].forEach((booking) => {
          //   OfficeBookingService.cancelBooking(booking.BookingId);
          // });

          for (const booking of bookings[0]) {
            console.log('booking #');
            console.log(booking.BookingId);
            await OfficeBookingService.cancelBooking(booking.BookingId);
          }

          await Availabilities.deleteAvailability(id);
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
   * Create an Availability (mark a workspace as available)
   *
   * startDate date 
   * endDate date 
   * workspaceId String 
   * returns Availability
   **/
  static createAvailability({ startDate, endDate, workspaceId }) {
    return new Promise(
      async (resolve, reject) => {
        try {
          // Availabilities.getExistingConflictingAvailabilities(startDate, endDate, workspaceId).then(obj => {
          //   if (obj[0].length !== 0) {
          //     reject(new Error(403));
          //   } else {
          //     Availabilities.insertAvailability(startDate, endDate, workspaceId).then(() => {
          //       Availabilities.getByStartEndDateAndWorkspaceId(startDate, endDate, workspaceId).then(obj => {
          //         resolve(obj[0]);
          //       });
          //     });
          //   }
          // })
          if (endDate < startDate) {
            console.log("/availability POST -> createAvailability -> Response: 403 End Date before Start Date");
            throw { message: "End Date before Start Date", status: 403 };
          }
          const hasConflict = await Availabilities.hasAvailabilityConflict(startDate, endDate, workspaceId);
          if (hasConflict) {
            console.log("/availability POST -> createAvailability -> Response: 403 Date Conflict");
            throw { message: "Date Conflict", status: 403 };
          } else {
            // console.log("createAvailability: no conflict. About to insert.");
            try {
              await Availabilities.insertAvailability(startDate, endDate, workspaceId);
              const createdAvailability = (await Availabilities.getByStartEndDateAndWorkspaceId(startDate, endDate, workspaceId))[0];
              // console.log("createAvailability: successful.");
              // console.log("newly created availability: ");
              // console.log(createdAvailability);
              console.log("/availability POST -> createAvailability -> Response: 200 OK");
              resolve(Service.successResponse(createdAvailability));
            } catch (e) {
              console.log(e);
              console.log("/availability POST -> createAvailabiltiy -> Response: 403 Cannot Insert (likely WorkplaceID not found)");
              throw { message: e, status: 403 };
            }
          }
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
          let locations = await Floors.getLocations();
          resolve(locations[0]);
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
   * Finds Availabilities by the Staff ID of the owner
   * The Availabilities of the Workspace(s) associated with the Staff ID will be found.
   *
   * id Integer the Staff ID of the office owner
   * returns List
   **/
  static getAvailabilitiesByOwnerID({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          Availabilities.getByStaffId(id).then(obj => {
            let promList = [];
            obj[0].forEach(ele => {
              promList.push(makeBookingPromise(ele));
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



}

//helper function
const makeBookingPromise = function (obj) {
  return new Promise((resolve, reject) => {
    Bookings.getByAvailabilityId(obj.AvailabilityId).then(o => {
      obj["bookings"] = o[0];
      resolve(obj);
    }).catch(err => {
      reject(err);
    })
  });
}

module.exports = OfficeLendingService, makeBookingPromise;