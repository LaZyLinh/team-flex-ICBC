const knex = require('./mysqlDB');

module.exports = {

  getBookedByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, booking b, user u, floor f where b.StaffId = u.StaffId and w.FloorId = f.FloorId and a.AvailabilityId = b.AvailabilityId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  },

  getByStaffId: function (id) {
    return knex.raw('select * from availability a, workspace w, floor f where w.FloorId = f.FloorId and a.WorkspaceId = w.WorkspaceId and w.StaffId = ?;', [id]);
  },

  getByDate: function (startDate, endDate, location, floor, features) {
    let query = 'select * from availability a, workspace w, floor f, feature fea, workspaceFeature wf'
      + ' where w.FloorId = f.FloorId and a.WorkspaceId = w.WorkspaceId '
      + 'and fea.FeatureId = wf.FeatureId and wf.workspaceId = w.workspaceId and a.startDate > \"' + startDate + '\" and a.endDate < \"' + endDate + "\"";

    if (features !== undefined) {
      features.forEach(element => {
        query += ' and a.WorkspaceId in (select WorkspaceId from feature f, workspacefeature wf where f.FeatureName = ' + element + ' and wf.FeatureId = f.FeatureId) '
      });
    }

    if (location !== undefined) {
      query = query + ' and f.Location =' + location;
    }
    if (floor !== undefined) {
      query = query + ' and f.FloorNo = ' + floor;
    }
    query += ' group by AvailabilityId;'
    // console.log(query);
    return knex.raw(query);
  },

  deleteAvailability: function (id) {
    return knex.raw('delete from availability where AvailabilityId = ?', [id]);
  }
}
