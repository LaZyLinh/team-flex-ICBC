'use strict';

var utils = require('../utils/writer.js');
var OfficeBooking = require('../service/OfficeBookingService');

module.exports.cancelBooking = function cancelBooking (req, res, next, id) {
  OfficeBooking.cancelBooking(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createBooking = function createBooking (req, res, next, bookingId) {
  OfficeBooking.createBooking(bookingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAvailabilities = function getAvailabilities (req, res, next, startDate, endDate, location, floor, features) {
  OfficeBooking.getAvailabilities(startDate, endDate, location, floor, features)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookingsByUserID = function getBookingsByUserID (req, res, next, staffId) {
  OfficeBooking.getBookingsByUserID(staffId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFeatures = function getFeatures (req, res, next, availabilityId, workspaceId) {
  OfficeBooking.getFeatures(availabilityId, workspaceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLocations = function getLocations (req, res, next) {
  OfficeBooking.getLocations()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPackages = function getPackages (req, res, next, startDate, endDate, floorIds, features) {
  OfficeBooking.getPackages(startDate, endDate, floorIds, features)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTopAvailabilities = function getTopAvailabilities (req, res, next, amount) {
  OfficeBooking.getTopAvailabilities(amount)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.lockBooking = function lockBooking (req, res, next, availabilityId, staffId, startDate, endDate) {
  OfficeBooking.lockBooking(availabilityId, staffId, startDate, endDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.unlockBooking = function unlockBooking (req, res, next, id) {
  OfficeBooking.unlockBooking(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
