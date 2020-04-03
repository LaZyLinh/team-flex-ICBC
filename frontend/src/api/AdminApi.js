/*
  Todo:
    1. Login
*/

// https://www.npmjs.com/package/axios

import Axios from 'axios'

const MILLIS_ADMIN_JWT_EXPIRY_TIME = 1000 * 60 * 60 * 24 * 3 // 3 days

let loggedIn = false;
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
  if (!loggedIn) {
    return false;
  }
  try {
    const tokenExpiresAt = localStorage.getItem("admin_jwt_expires_millis");
    if (tokenExpiresAt > Date.now()) {
      loggedIn = true;
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
    loggedIn = false;
    return false;
  }
}

export function getAdminToken() {
  return localStorage.getItem("admin_jwt")
}

// helper
async function api(verb, path, body = undefined) {
  if (!jwt) {
    throw new Error(`There is no admin jwt set`)
  }
  if (jwtExpiresMillis < Date.now()) {

  }
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
  if (verb === 'post') {
    return (await axios.post(path, body, config)).data
  }
  if (verb === 'get') {
    return (await axios.get(path, body, config)).data
  }
  if (verb === 'delete') {
    return (await axios.delete(path, body, config)).data
  }
  throw new Error(`The given verb (${verb}) is not get, post or delete`)
}

export async function createLocation(name) {
  try {
    await api('post', '/location', { locationName: name })
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
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