const knex = require('./mysqlDB');

module.exports = {
  getByAvailabilityId: function (avail_id) {
    return knex.raw("select * from booking b, user u where u.StaffId = b.StaffId and b.AvailabilityId = ?", [avail_id]);
  },

  getByWorkspaceId: function (workspaceId) {
    return knex.raw("select * from booking b, user u where u.StaffId = b.StaffId and b.WorkspaceId = ?", [workspaceId]);
  },

  getByStaffId: function (staffId) {
    // (does not return booking if it's on a workspace owned by no one)
    return knex.raw("select b.Confirmed as Confirmed, b.BookingId as BookingId, b.StartDate as BookingStartDate, b.EndDate as BookingEndDate, b.StaffId as BookingStaffId, b.AvailabilityId as AvailabilityId,"
      + " w.WorkspaceId as OwnerWorksapceId, w.WorkspaceName as OwnerWorkspaceName, w.StaffId as OwnerStaffId, f.FloorId as FloorId, f.FloorNo as FloorNo, "
      + " f.Location as Location, f.City as City, f.Building as Building, f.FloorPlanUrl as FloorPlanUrl, u.Email as OwnerEmail, u.FirstName as OwnerFirstName, u.LastName as OwnerLastName,"
      + " u.Department as OwnerDepartment, u.Valid as OwnerValid from booking b, workspace w, floor f, user u where b.WorkspaceId = w.WorkspaceId and w.FloorId = f.FloorId and w.StaffId = u.StaffId and b.StaffId = ?;", [staffId]);
  },

  deleteBooking: function (id) {
    return knex.raw('delete from booking where BookingId = ?', [id]);
  },

  confirmBooking: function (bookingId) {
    return knex('booking').where({ BookingId: bookingId }).update({ Confirmed: true });
  },

  getUserEmail: function (bookingId) {
    return knex.raw("select u.Email from booking b, user u where b.BookingId = ? and u.StaffId = b.StaffId", [bookingId]);
  },

  getOwnerEmail: function (bookingId) {
    return knex.raw("select u.Email from booking b, user u, workspace w where w.StaffId = u.StaffId and b.WorkspaceId = w.WorkspaceId and b.BookingId = ?", [bookingId]);
  },

  getByBookingId: function (bookingId) {
    return knex.raw("select * from booking b where b.BookingId = ?", [bookingId]);
  },

  insertBooking: function (availabilityId, staffId, startDate, endDate, confirmedStatus) {
    return knex('booking').insert({ AvailabilityId: availabilityId, StaffId: staffId, StartDate: startDate, EndDate: endDate, Confirmed: confirmedStatus });
  },

  getBookingbyAvailStaffDates: function (availabilityId, staffId, startDate, endDate) {
    let query = 'select * from booking b where b.AvailabilityId = ';
    query += availabilityId;
    query += ' and b.StaffId = ';
    query += staffId;
    query += ' and b.StartDate = \"';
    query += startDate;
    query += '\" and b.EndDate = \"';
    query += endDate;
    query += '\";'

    console.log(query);
    return knex.raw(query);
  }
}