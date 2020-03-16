const knex = require('./mysqlDB');

module.exports = {

  assignUserToWorkspace: function (workspaceId, userId) {
    return knex.raw("update `workspace` set StaffId = ? where WorkspaceId = ?;", [userId, workspaceId]);
  },

  getWorkspaceByFloorId: function (floorId) {
    return knex.raw("select * " +
      "from workspace inner join floor on workspace.FloorId = floor.FloorId "
      + "inner join `user` on user.StaffId = workspace.StaffId "
      + "where workspace.FloorId= " + floorId + ";");
  }

}