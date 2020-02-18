/* eslint-disable no-unused-vars */
const Service = require('./Service');

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
   * Create an Availability (mark a workspace as available)
   *
   * startDate date 
   * endDate date 
   * workspaceId Integer 
   * returns Availability
   **/
  static createAvailability({ startDate, endDate, workspaceId }) {
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

module.exports = OfficeLendingService;
