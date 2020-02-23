const knex = require('./mysqlDB');

module.exports = {
  getByAvailabilityId: function (avail_id) {
    return knex.raw("select * from booking b, user u where u.StaffId = b.StaffId and b.AvailabilityId = ?", [avail_id]);
  },


}