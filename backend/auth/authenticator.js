// Middleware for authenticating JWT for Azure AD

const axios = require("axios"); // for easy Promise http client
const jwt = require("jsonwebtoken"); // for JSON web token decode and verify
const fs = require('fs')
const envfile = require('envfile')
const sourcePath = '.env'


// Get public keys from Microsoft
getKeys = async () => {
  const { data } = await axios.get("https://login.microsoftonline.com/common/discovery/v2.0/keys");
  keys = data.keys;
  gotKeys = true;
  return keys;
}

getKeySync = (kid, keys) => {
  for (const key of keys) {
    if (key.kid === kid) {
      return key.x5c[0];
    }
  }
  throw new Error(`Couldn't find a matching key in the keys obtained from microsoft`);
}

async function getAndStoreMSADKey() {
  const keys = await getKeys();
  // console.log(envfile.parseFileSync(sourcePath))
  await writeKeyToENV(keys);
}

async function writeKeyToENV(keys) {
  let parsedFile = envfile.parseFileSync(sourcePath);
  parsedFile.AD_pub_key = JSON.stringify(keys);
  fs.writeFileSync(sourcePath, envfile.stringifySync(parsedFile))
}

getKey = async kid => {
  const pub_keys = JSON.parse(process.env.AD_pub_key);

  if (pub_keys) {
    return getKeySync(kid, pub_keys);
  } else {
    const keys = await getKeys();
    await writeKeyToENV(keys);
    return getKeySync(kid, keys);
  }
}

function authenticate() {
  //  handle if no token or failed verification
  return async (request, response, next) => {

    try {
      const token = request.headers.authorization;
      if (!token) {
        throw new Error("cannot find token in header!")
      }
      const theToken = token.replace('Bearer ', '');

      // Decode the header to get the "kid" (key id)
      const decoded = jwt.decode(theToken, { complete: true });
      // console.log("decoded sign: " + decoded.signature);
      let key = await getKey(decoded.header.kid);
      let appendedkey = '-----BEGIN CERTIFICATE-----\n' + key + '\n-----END CERTIFICATE-----'
      console.log("key: " + appendedkey);
      // Verify the token with this key
      jwt.verify(theToken, appendedkey, async function (err, decodeedToken) {
        if (err) {
          // If error, try to get key and try again
          const keys = await getKeys();
          await writeKeyToENV(keys);
          key = getKeySync(decoded.header.kid, keys);

          try {
            appendedkey = '-----BEGIN CERTIFICATE-----\n' + key + '\n-----END CERTIFICATE-----';
            jwt.verify(theToken, appendedkey);
            next();
          } catch (error) {
            throw new Error(error)
          }
        } else {
          console.log(decodeedToken);
          next();
          return;
        }
      });

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

    } catch (error) {
      response.status(401);
      next(new Error("user authentication failed!" + error))
    }
  };
}

module.exports = { authenticate, getAndStoreMSADKey };