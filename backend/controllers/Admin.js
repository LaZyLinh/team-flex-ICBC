'use strict';

var utils = require('../utils/writer.js');
var Admin = require('../service/AdminService');

module.exports.adminResetFeatures = function adminResetFeatures (req, res, next) {
  Admin.adminResetFeatures()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminUploadFloorData = function adminUploadFloorData (req, res, next, floorId, floorData) {
  Admin.adminUploadFloorData(floorId, floorData)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adminUploadFloorplanImage = function adminUploadFloorplanImage (req, res, next, floorId, floorplanImage) {
  Admin.adminUploadFloorplanImage(floorId, floorplanImage)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
