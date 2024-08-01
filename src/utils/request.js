import axios from "axios";
import { message } from "antd";

const domain = "https://woaybb.com";

export const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 5000000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// added the domain url
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("access");

  // Check if the URL is neither login nor signup
  if (
    !config.url.endsWith("/api/accounts/login/") &&
    !config.url.endsWith("/api/accounts/signup/")
  ) {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Intercept the response data, 1. handle data, 2. handle error
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data } = error.response;
      message.error(`Error: ${data.message}`);
    } else if (error.request) {
      // The request was made but no response was received
      message.error("Error: No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      message.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// get resource
export const get = url => axiosInstance.get(url);

// add a new resource
export const post = (url, params) => axiosInstance.post(url, params);

// update a resource
export const put = (url, params) => axiosInstance.put(url, params);

// delete a resource
export const del = (url, params) => axiosInstance.del(url, params);
