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
    adminconfig.salt = salt;
    let passString = JSON.stringify(adminconfig);

    fs.writeFile(adminConfigPath, passString, error => {
      if (error) {
        throw error;
      } else {
        console.log('update success')
      }
    });
  }

  async validatePassword(password) {
    // read admin config file
    let config;
    let data = fs.readFileSync(adminConfigPath, 'utf-8');
    config = JSON.parse(data);
    const hash = crypto.pbkdf2Sync(password, config.salt, 10000, 512, 'sha512').toString('hex');
    return (config.adminPassword === hash);

  }

  generateJWT() {
    const today = new Date();
    const exirationDate = new Date(today);
    exirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
      id: "admin",
      exp: parseInt(exirationDate.getTime() / 1000, 10)
    }, adminconfig.secret)
  }


}

module.exports = validation;