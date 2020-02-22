const Controller = require('./Controller');

class OfficeLendingController {
  constructor(Service) {
    this.service = Service;
  }

  async cancelAvailability(request, response) {
    await Controller.handleRequest(request, response, this.service.cancelAvailability);
  }

  async createAvailability(request, response) {
    await Controller.handleRequest(request, response, this.service.createAvailability);
  }

  async getAvailabilitiesByOwnerID(request, response) {
    await Controller.handleRequest(request, response, this.service.getAvailabilitiesByOwnerID);
  }

  async getLocations(request, response) {
    await Controller.handleRequest(request, response, this.service.getLocations);
  }

}

module.exports = OfficeLendingController;
