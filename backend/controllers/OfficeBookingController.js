// Unused as of Mar 22

const Controller = require('./Controller');

class OfficeBookingController {
  constructor(Service) {
    this.service = Service;
  }

  async cancelBooking(request, response) {
    await Controller.handleRequest(request, response, this.service.cancelBooking);
  }

  async createBooking(request, response) {
    await Controller.handleRequest(request, response, this.service.createBooking);
  }

  async getAvailabilities(request, response) {
    await Controller.handleRequest(request, response, this.service.getAvailabilities);
  }

  async getBookingsByUserID(request, response) {
    await Controller.handleRequest(request, response, this.service.getBookingsByUserID);
  }

  async getLocations(request, response) {
    await Controller.handleRequest(request, response, this.service.getLocations);
  }

  async getPackages(request, response) {
    await Controller.handleRequest(request, response, this.service.getPackages);
  }

  async getTopAvailabilities(request, response) {
    await Controller.handleRequest(request, response, this.service.getTopAvailabilities);
  }

  async lockBooking(request, response) {
    await Controller.handleRequest(request, response, this.service.lockBooking);
  }

  async unlockBooking(request, response) {
    await Controller.handleRequest(request, response, this.service.unlockBooking);
  }

  async getFeatures(request, response) {
    await Controller.handleRequest(request, response, this.service.getFeatures);
  }

}

module.exports = OfficeBookingController;
