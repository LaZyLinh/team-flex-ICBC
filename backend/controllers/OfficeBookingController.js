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

  async lockBooking(request, response) {
    await Controller.handleRequest(request, response, this.service.lockBooking);
  }

  async unlockBooking(request, response) {
    await Controller.handleRequest(request, response, this.service.unlockBooking);
  }

}

module.exports = OfficeBookingController;
