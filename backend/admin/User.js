const userDB = require('../db/user')
const workspaceDB = require('../db/workspace')


class User {

  // params: firstName, lastName, department, email, (workspaceId)
  static addUser(params) {
    let obj = {};
    obj.FirstName = params.firstName;
    obj.LastName = params.lastName;
    obj.Department = params.department;
    obj.Email = params.email;
    obj.Valid = true;
    console.log(obj)
    userDB.insertUser(obj).then(id => {
      console.log(id[0].StaffId);
      if (id[0].StaffId) {
        // if (params.workspaceId) {
        //   workspaceDB.assignUserToWorkspace(params.workspaceId, id[0].StaffId).then(() => {
        //     resolve(id[0].StaffId);
        //   }).catch(err => {
        //     reject(err)
        //   })
        // }
        return id[0].StaffId;
      } else {
        new Error("add user failed")
      }
    }).catch(err => {
      // new err;
      console.log(err)
    })
  }
}

module.exports = User