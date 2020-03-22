// Note: Unused (admin functions implemented in /admin/adminApp.js)

'use strict';


/**
 * Resets the list of features to a custom specified list
 * Sets the list of features in the system. Previous features that do not exist in this list are deleted, and new features are added. Does not affect features that exist both previously and in this list
 *
 * no response value expected for this operation
 **/
exports.adminResetFeatures = function () {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Upload a CSV of a floor's workspaces
 * Upload a CSV containing information about each workspace on a floor (owner and features)
 *
 * floorId Integer 
 * floorData byte[] 
 * no response value expected for this operation
 **/
exports.adminUploadFloorData = function (floorId, floorData) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Upload a JPG floor plan for a specific floor
 *
 * floorId Integer 
 * floorplanImage byte[] 
 * no response value expected for this operation
 **/
exports.adminUploadFloorplanImage = function (floorId, floorplanImage) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

