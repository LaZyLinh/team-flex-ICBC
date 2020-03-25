import axios from "axios";

export const getUserInfo = async (email, token) => {
  axios.post("https://icbcflexwork.me/auth/user", {
    Email: email
  }, {
    headers: { "Authorization": "Bearer " + token }
  });
}
