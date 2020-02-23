const knex = require('./mysqlDB');

module.exports = {
  getByAvailabilityId: function (avail_id) {
    return knex.raw("select * from booking b, user u where u.StaffId = b.StaffId and b.AvailabilityId = ?", [avail_id]);
  },

  getByStaffId: function (staffId) {
    return knex.raw("select b.Confirmed as Confirmed, b.BookingId as BookingId, b.StartDate as BookingStartDate, b.EndDate as BookingEndDate, b.StaffId as BookingStaffId, b.AvailabilityId as AvailabilityId,"
      + " w.WorkspaceId as OwnerWorksapceId, w.WorkspaceName as OwnerWorkspaceName, w.StaffId as OwnerStaffId, f.FloorId as FloorId, f.FloorNo as FloorNo, "
      + " f.Location as Location, f.City as City, f.Building as Building, f.FloorPlanUrl as FloorPlanUrl, u.Email as OwnerEmail, u.FirstName as OwnerFirstName, u.LastName as OwnerLastName,"
      + " u.Department as OwnerDepartment, u.Valid as OwnerValid from booking b, workspace w, floor f, user u where b.WorkspaceId = w.WorkspaceId and w.FloorId = f.FloorId and w.StaffId = u.StaffId and b.StaffId = ?;", [staffId]);
  }
}