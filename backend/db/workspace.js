const knex = require('./mysqlDB');

module.exports = {

  assignUserToWorkspace: function (workspaceId, userId) {
    return knex.raw("update `workspace` set StaffId = ? where WorkspaceId = ?;", [userId, workspaceId]);
  }

}