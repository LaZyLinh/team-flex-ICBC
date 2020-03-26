'use strict';
const OfficeLendingService = require('../services/OfficeLendingService')
const OfficeBookingService = require('../services/OfficeBookingService')

/**
 * Cancel an Availability
 *
 * id Integer ID of the Availability to delete
 * no response value expected for this operation
 **/
exports.cancelAvailability = function (id) {
  return OfficeLendingService.cancelAvailability({ id })
}


/**
 * Create an Availability (mark a workspace as available)
 *
 * startDate date 
 * endDate date 
 * workspaceId String 
 * returns Availability
 **/
exports.createAvailability = function (body) {
  return OfficeLendingService.createAvailability(body)
}


/**
 * Finds Availabilities by the Staff ID of the owner
 * The Availabilities of the Workspace(s) associated with the Staff ID will be found.
 *
 * id Integer the Staff ID of the office owner
 * returns List
 **/
exports.getAvailabilitiesByOwnerID = function (id) {
  return OfficeLendingService.getAvailabilitiesByOwnerID({ id })
}


/**
 * Get features by availabilityId, workspaceId, or all features if no params
 *
 * availabilityId BigDecimal  (optional)
 * workspaceId String  (optional)
 * returns List
 **/
exports.getFeatures = function (availabilityId, workspaceId) {
  return OfficeBookingService.getFeatures({ availabilityId, workspaceId })
}


/**
 * A list of all the location names
 *
 * returns List
 **/
exports.getLocations = function () {
  return OfficeLendingService.getLocations()
}

