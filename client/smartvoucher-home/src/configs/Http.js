import axios from "axios";
import Store from "../Redux/Store";

const Http = axios.create({
  baseURL: `http://localhost:8082`,
  //baseURL: `https://3588-2405-4802-801d-3370-6cc4-a175-8002-4864.ngrok-free.app`,
});

Http.interceptors.request.use(
  function (request) {
    const token = Store.getState().auth.accessToken;
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Http.defaults.withCredentials = true;
Http.defaults.headers.common['ngrok-skip-browser-warning'] = "any value";

Http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error.response.data.error);
    return Promise.reject(error);
  }
);

export default Http;
