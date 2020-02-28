const knex = require('./mysqlDB');

module.exports = {
  getLocations: function () {
    return knex.raw("select f.Location from floor f");
  }
}