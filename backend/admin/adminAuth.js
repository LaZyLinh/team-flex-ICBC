const jwt = require('express-jwt');
var path = require("path");
const adminConfigPath = path.resolve('./adminconfig.json');
const adminconfig = require(adminConfigPath);

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
}

const auth = {
  required: jwt({
    secret: adminconfig.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  })
}

module.exports = auth;