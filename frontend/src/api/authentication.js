import axios from "axios";

export const getUserInfo = async (email, token) => {
  const res = await axios.post("https://icbcflexwork.me:8080/auth/user", {
    Email: email
  }, {
    headers: { "Authorization": "Bearer " + token }
  });
  return res;
}
