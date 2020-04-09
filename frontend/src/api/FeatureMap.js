import Axios from "axios";
import { BASE_URL } from "./BaseUrl";

const axios = Axios.create({
  baseURL: BASE_URL
});

// Usage: const fm = await featureMap()
const featureMap = async () => {
  return (await axios.get('/featuremap')).data;
};

export default featureMap;
