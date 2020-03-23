const Bookings = require('../db/bookings')

class Service {
  static rejectResponse(error, code = 500) {
    return { error, code };
  }

  // change made to adapt swagger
  static successResponse(payload, code = 200) {
    return payload;
  }

  static makeBookingPromise(obj) {
    return new Promise((resolve, reject) => {
      Bookings.getByAvailabilityId(obj.AvailabilityId).then(o => {
        obj["bookings"] = o[0];
        resolve(obj);
      }).catch(err => {
        reject(err);
      })
    });
  }
}

module.exports = Service;
