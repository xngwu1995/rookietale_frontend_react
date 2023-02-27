import axios from 'axios';

// added the domain url
axios.interceptors.request.use((config) => ({
  ...config,
  url: config.url,
}));

// Intercept the response data, 1. handle data, 2. handle error
axios.interceptors.response.use((response) => response.data, (err) => Promise.reject(err));

// get resource
export const get = (url) => axios.get(url);

// add a new resource
export const post = (url, params) => axios.post(url, params);

// update a resource
export const put = (url, params) => axios.put(url, params);

// delete a resource
export const del = (url, params) => axios.del(url, params);
