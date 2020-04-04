const knex = require('./mysqlDB');

module.exports = {
  getLocations: function () {
    return knex.raw("select f.Location from floor f");
  },

  getLocationByCity: function (city) {
    return knex.raw("select * from floor where city=" + city);
  }
}