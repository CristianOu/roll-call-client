import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_DEV_LOCAL;

const http = {
  get: axios.get,
  delete: axios.delete,
  post: axios.post,
  put: axios.put
};

export default http;