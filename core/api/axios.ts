import axios from "axios";

// Add a request interceptor

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.request.use(
  function (config) {
    const { value: token } = useCookie("token");
    config.headers.Authorization = `Basic ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
