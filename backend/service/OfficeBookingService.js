'use strict';

const OfficeBookingService = require('../services/OfficeBookingService')

/**
 * Cancel an upcoming Booking
 *
 * id Integer ID of the Booking to delete
 * no response value expected for this operation
 **/
exports.cancelBooking = function (id) {
  return OfficeBookingService.cancelBooking({ id })
}

exports.getFloors = function (floorId, location) {
  return OfficeBookingService.getFloors({ floorId, location });
}

/**
 * Confirm a temporarily locked Booking
 *
 * bookingId Integer 
 * returns BookingSummary
 **/
exports.createBooking = function (body) {
  return OfficeBookingService.createBooking(body)
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
 **/
exports.getAvailabilities = function (startDate, endDate, location, floor, features) {
  return OfficeBookingService.getAvailabilities({ startDate, endDate, location, floor, features })
}


/**
 * Finds Bookings by User ID
 *
 * staffId Integer The ID of the User
 * returns List
 **/
exports.getBookingsByUserID = function (staffId) {
  return OfficeBookingService.getBookingsByUserID({ staffId })
}

exports.getBookingsSimple = function (staffId) {
  return OfficeBookingService.getBookingsSimple({ staffId })
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
  return OfficeBookingService.getLocations()
}


/**
 * Finds Availabilities or Booking Suggestion Packages
 * Finds Availabilities, filtered by start and end dates, optional location (desired floor IDs), and optional required features. will use multiple eligible offices to suggest a booking package if a single desk is not available for the duration.
 *
 * startDate date 
 * endDate date 
 * floorIds List  (optional)
 * features List  (optional)
 * no response value expected for this operation
 **/
exports.getPackages = function (startDate, endDate, floorIds, features) {
  return OfficeBookingService.getPackages({ startDate, endDate, floorIds, features })
}


/**
 * Finds top availabilities, not filtered
 *
 * amount BigDecimal 
 * returns List
 **/
exports.getTopAvailabilities = function (amount) {
  return OfficeBookingService.getTopAvailabilities({ amount })
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
exports.lockBooking = function (body) {
  return OfficeBookingService.lockBooking(body)
}


/**
 * Unlocks a Booking before the 20 minute automatic unlock
 * For when the User navigates away from the confirmation page or closes the browser tab.
 *
 * id Integer ID of the Booking to delete
 * no response value expected for this operation
 **/
exports.unlockBooking = function (id) {
  return OfficeBookingService.unlockBooking({ id })
}

