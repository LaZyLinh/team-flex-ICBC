import { authProvider } from '../authProvider';

export const request = async (url) => {
  const token = await authProvider.getAccessToken();
  console.log("access token is " + token.accessToken);
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
      'Content-Type': 'application/json',
    }
  })
}

