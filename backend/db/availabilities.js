const knex = require('./mysqlDB');

module.exports = {
  getByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, booking b where a.AvailabilityId = b.AvailabilityId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  }
}