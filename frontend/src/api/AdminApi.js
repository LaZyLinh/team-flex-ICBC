/*
  Todo:
    1. Login
*/

// https://www.npmjs.com/package/axios

import Axios from 'axios'
import { func } from 'prop-types';

const MILLIS_ADMIN_JWT_EXPIRY_TIME = 1000 * 60 * 60 * 24 * 3 // 3 days

let jwt = localStorage.getItem("admin_jwt")
let jwtExpiresMillis = localStorage.getItem("admin_jwt_expires_millis")
if (!jwtExpiresMillis) {
  jwtExpiresMillis = 0;
}

const axios = Axios.create({
  baseURL: 'https://icbcflexwork.me:8080/admin'
});

export async function login(passwordStr) {
  try {
    const response = await axios.post('/login', {
      password: passwordStr
    })
    const token = response.data.token;
    jwt = token;
    localStorage.setItem("admin_jwt", token);
    const timeMillis = Date.now() + MILLIS_ADMIN_JWT_EXPIRY_TIME;
    jwtExpiresMillis = timeMillis;
    localStorage.setItem("admin_jwt_expires_millis", timeMillis);
    return true;
  } catch (err) {
    jwt = null;
    jwtExpiresMillis = 0;
    localStorage.setItem("debug", JSON.stringify(err))
    console.log(err);
    return false;
  }
}

export function isLoggedIn() {
  try {
    const tokenExpiresAt = localStorage.getItem("admin_jwt_expires_millis");
    if (tokenExpiresAt > Date.now()) {
      jwt = getAdminToken();
      jwtExpiresMillis = tokenExpiresAt
      return true;
    } else {
      jwt = null;
      jwtExpiresMillis = 0;
      localStorage.removeItem("admin_jwt");
      localStorage.removeItem("admin_jwt_expires_millis");
      return false;
    }
  } catch (e) {
    return false;
  }
}

export function getAdminToken() {
  return localStorage.getItem("admin_jwt")
}

// helper
async function api(verb, path, body = undefined) {
  jwt = localStorage.getItem("admin_jwt")
  if (!jwt) {
    throw new Error(`There is no admin jwt set`)
  }
  if (jwtExpiresMillis < Date.now()) {
    // TODO: handle expired token after opening admin page
  }
  console.log(jwt)
  const config = {
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-type": 'application/x-www-form-urlencoded'
    }
  }
  if (verb === 'post') {
    return (await axios.post(path, body, config)).data
  }
  if (verb === 'get') {
    return (await axios.get(path, config))
  }
  if (verb === 'delete') {
    return (await axios.delete(path, body, config)).data
  }
  if (verb === 'put') {
    return (await axios.put(path, body, config)).data
  }
  throw new Error(`The given verb (${verb}) is not get, post or delete`)
}

export async function createLocation(name) {
  try {
    await api('post', '/locations', { locationName: name })
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    throw err;
  }
}

export async function getLocationNames() {
  try {
    return (await api('get', '/locations')).data
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

export async function deleteLocationName(name) {
  try {
    await api('delete', `/locations/${name.trim()}`)
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}


// file must in binary
export async function uploadFloorData(floorid, csvFile) {
  try {
    await api('post', "/upload-floor-data", { floorId: floorid, floorData: csvFile })
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

// img must in binary
export async function uploadFloorImage(floorid, img) {
  try {
    await api('post', "/upload-floorplan-image", { floorId: floorid, floorplanImage: img })
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

export async function getWorkspacesByFloorId(floorId) {
  console.log("hi");
  try {
    return (await api('get', '/workspaces?floorId=' + floorId)).data
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

export async function deleteWorkspace(workspaceId) {
  try {
    await api('delete', '/deleteWorkpace?=' + workspaceId);
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

export async function updateWorkspace(body) {
  try {
    await api('put', '/workspaces', body);
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}


// ! backend may have error, dont use yet
export async function resetFeatures(features) {
  try {
    await api('post', '/reset-features', { featureList: features });
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

export async function getFloorsByCity(city) {
  try {
    return (await api('get', '/floors?city=\"' + city + '\"')).data
    // return (await api('get', '/floors?city=' + city)).data
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}
