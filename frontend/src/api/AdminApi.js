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
  localStorage.setItem("debug_body", JSON.stringify(body))
  jwt = localStorage.getItem("admin_jwt")
  if (!jwt) {
    throw new Error(`There is no admin jwt set`)
  }
  if (jwtExpiresMillis < Date.now()) {
    // TODO: handle expired token after opening admin page
  }
  const config = {
    headers: {
      "Authorization": `Bearer ${jwt}`,
      // "Content-type": 'application/x-www-form-urlencoded' // TODO implement this with qs
    }
  }
  if (verb === 'post') {
    return (await axios.post(path, body, config)).data
  }
  if (verb === 'get') {
    return (await axios.get(path, config))
  }
  if (verb === 'delete') {
    return (await axios.delete(path, config))
  }
  if (verb === 'put') {
    return (await axios.put(path, body, config)).data
  }
  throw new Error(`The given verb (${verb}) is not get, post, delete or put`)
}

export async function createLocation(name) {
  localStorage.setItem("debug", name);
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
  var bodyFormData = new FormData();
  bodyFormData.append("floorId", floorid);
  bodyFormData.append("floorData", csvFile);
  jwt = localStorage.getItem("admin_jwt")
  await Axios({
    method: 'POST',
    url: 'https://icbcflexwork.me:8080/admin/upload-floor-data',
    data: bodyFormData,
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  })
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
  try {
    return (await api('get', '/workspaces?floorId=' + floorId)).data
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

export async function deleteWorkspace(workspaceId) {
  console.log("call delete")
  console.log(workspaceId)
  try {
    console.log("HEY")
    await api('delete', '/deleteWorkspace?id=' + workspaceId);
  } catch (err) {
    localStorage.setItem("admin_delete_error", JSON.stringify(err))
    console.log(err)
    throw err;
  }
}

export async function updateWorkspace(workspaceId, email) {
  try {
    await api('put', '/workspaces?id=' + workspaceId, { email: email });
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    throw err;
  }
}



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

export async function addFloor(bdata) {
  jwt = localStorage.getItem("admin_jwt")
  await Axios({
    method: 'POST',
    url: 'https://icbcflexwork.me:8080/admin/floors',
    data: bdata,
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  })

}

export async function deleteFloor(id) {
  try {
    await api('delete', `/floors?id=${id}`);
  } catch (err) {
    localStorage.setItem("admin_error", JSON.stringify(err))
    console.log(err)
  }
}

