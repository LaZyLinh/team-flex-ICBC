const knex = require('./mysqlDB');

module.exports = {

  getBookedByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, booking b, user u, floor f where b.StaffId = u.StaffId and w.FloorId = f.FloorId and a.AvailabilityId = b.AvailabilityId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  },

  getByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, floor f where w.FloorId = f.FloorId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  },

  getByDate: function (startDate, endDate, location, floor, features) {
    let query = 'select * from availability a, workspace w, floor f, feature fea, workspaceFeature wf where w.FloorId = f.FloorId and a.WorkspaceId = w.WorkspaceId '
      + 'and fea.FeatureId = wf.FeatureId and wf.workspaceId = w.workspaceId and a.startDate > \"' + startDate + '\" and a.endDate < \"' + endDate + "\"";
    if (location !== undefined) {
      query = query + ' and f.Location = ' + location;
    }
    if (floor !== undefined) {
      query = query + ' and f.FloorNo = ' + floor;
    }
    if (features !== undefined) {
      features.array.forEach(element => {
        // TODO
      });
    }
    query += ';'
    console.log(query);
    return knex.raw(query);
  }
}
