/*
  Todo:
    1. Login
*/

// https://www.npmjs.com/package/axios

import Axios from 'axios'

const MILLIS_ADMIN_JWT_EXPIRY_TIME = 1000 * 60 * 60 * 24 * 3 // 3 days

const instance = Axios.create({
  baseURL: 'https://icbcflexwork.me:8080/admin'
});

export async function login(passwordStr) {
  try {
    const response = await instance.post('/login', {
      password: passwordStr
    })
    const token = response.data.token;
    localStorage.setItem("admin_jwt", token);
    const timeMillis = Date.now() + MILLIS_ADMIN_JWT_EXPIRY_TIME;
    localStorage.setItem("admin_jwt_expires_millis", timeMillis);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function isLoggedIn() {
  try {
    const tokenExpiresAt = localStorage.getItem("admin_jwt_expires_millis");
    return tokenExpiresAt > Date.now();
  } catch (e) {
    return false;
  }
}

export function getAdminToken() {
  return localStorage.getItem("admin_jwt")
}