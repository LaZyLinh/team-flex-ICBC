'use strict';

var utils = require('../utils/writer.js');
var OfficeLending = require('../service/OfficeLendingService');

module.exports.cancelAvailability = function cancelAvailability (req, res, next, id) {
  OfficeLending.cancelAvailability(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createAvailability = function createAvailability (req, res, next, startDate, endDate, workspaceId) {
  OfficeLending.createAvailability(startDate, endDate, workspaceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAvailabilitiesByOwnerID = function getAvailabilitiesByOwnerID (req, res, next, id) {
  OfficeLending.getAvailabilitiesByOwnerID(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFeatures = function getFeatures (req, res, next, availabilityId, workspaceId) {
  OfficeLending.getFeatures(availabilityId, workspaceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLocations = function getLocations (req, res, next) {
  OfficeLending.getLocations()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
