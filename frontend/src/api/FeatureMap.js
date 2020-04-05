import Axios from "axios";

const axios = Axios.create({
  baseURL: 'https://icbcflexwork.me:8080/'
});

const featureMap = async () => {
  return await axios.get('/featureMap').data
};

export default featureMap;