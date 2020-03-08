// Middleware for authenticating JWT for Azure AD

const axios = require("axios"); // for easy Promise http client
const jwt = require("jsonwebtoken"); // for JSON web token decode and verify

let keys = [];
let gotKeys = false;

// Get public keys from Microsoft
getKeys = async () => {
  const { data } = await axios.get("https://login.microsoftonline.com/common/discovery/v2.0/keys");
  keys = data.keys;
  gotKeys = true;
}

getKeySync = kid => {
  for (const key of keys) {
    if (key.kid === kid) {
      return key.n;
    }
  }
  throw new Error(`Couldn't find a matching key in the keys obtained from microsoft`);
}

getKey = async kid => {
  if (gotKeys) {
    return getKeySync(kid);
  } else {
    await getKeys();
    return getKeySync(kid);
  }
}

function authenticator() {
  // TODO: handle if no token or failed verification
  return async (request, response, next) => {
    // TODO: not sure if this works as we expect
    const token = request.header.authorization;

    // Decode the header to get the "kid" (key id)
    const decoded = jwt.decode(token, { header: true });
    const key = await getKey(decoded.header.kid);
    // Verify the token with this key
    const decodedToken = jwt.verify(token, key);

    // Can further check the decodedToken to see if it has the correct issuer, user ID, etc.

    // If it doesn't pass authentication then here I guess we can return 401 unauthorized
    // by ...
    // response.status = 401;
    // response.error = "some error message"
    // the API router is already configured to respond to this appropriately

    // We don't need to do anything with the user info decoded from the JWT since the front end will
    // already include it in their query params / POST body etc.
    // This way we don't have to change the services to take user info from a modified request
    // I.e. we shouldn't actually modify the request here

    next();
  };
}

module.exports = authenticator;