const knex = require('./mysqlDB');

module.exports = {

  getBookedByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, booking b, user u, floor f where b.StaffId = u.StaffId and w.FloorId = f.FloorId and a.AvailabilityId = b.AvailabilityId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  },

  getByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, floor f where w.FloorId = f.FloorId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  }
}
