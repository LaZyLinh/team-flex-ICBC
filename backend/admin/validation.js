const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
var path = require("path");
const adminConfigPath = path.resolve('./adminconfig.json');
const adminconfig = require(adminConfigPath);

class validation {

  setPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const thePass = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    adminconfig.adminPassword = thePass;
    let passString = JSON.stringify(adminconfig);

    fs.writeFile(adminConfigPath, passString, error => {
      if (error) {
        throw error;
      } else {
        console.log('update success')
      }
    });
  }


}

module.exports = validation;