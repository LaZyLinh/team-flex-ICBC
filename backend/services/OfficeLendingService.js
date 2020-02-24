/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Availabilities = require('../db/availabilities');
const Bookings = require('../db/bookings');

class OfficeLendingService {

  /**
     * Cancel an Availability
     *
     * id Integer ID of the Availability to delete
     * no response value expected for this operation
     **/
  static cancelAvailability({ id }) {
    return new Promise(
      async (resolve) => {
        try {
          await Availabilities.deleteAvailability(id);
          resolve("OK");
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
   * Create an Availability (mark a workspace as available)
   *
   * startDate date 
   * endDate date 
   * workspaceId String 
   * returns Availability
   **/
  static createAvailability({ startDate, endDate, workspaceId }) {
    return new Promise(
      async (resolve) => {
        try {
          Availabilities.getExistingConflictingAvailabilities(startDate, endDate, workspaceId).then(obj => {
            if (obj[0].length !== 0) {
              resolve('403'); // TODO!!! how to reject with 403 error???
            } else {
              Availabilities.insertAvailability(startDate, endDate, workspaceId).then(() => {
                Availabilities.getByStartEndDateAndWorkspaceId(startDate, endDate, workspaceId).then(obj => {
                  resolve(obj[0]);
                });
              });
            }
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
      obj["booking"] = o[0];
      resolve(obj);
    }).catch(err => {
      reject(err);
    })
  });
}

module.exports = OfficeLendingService, makeBookingPromise;
