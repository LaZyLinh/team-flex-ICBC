import Axios from "axios";

const axios = Axios.create({
  baseURL: 'https://icbcflexwork.me:8080/'
});

// Usage: const fm = await featureMap()
const featureMap = async () => {
  return (await axios.get('/featuremap')).data;
};

export default featureMap;
