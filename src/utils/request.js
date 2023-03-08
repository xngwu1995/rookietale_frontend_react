import { Toast } from 'antd-mobile';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const domain = 'http://10.0.0.26:8000';

export const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': cookies.get('csrftoken'),
    accept: 'application/json',
  },
});

// added the domain url
axiosInstance.interceptors.request.use((config) => {
  const token = `JWT ${localStorage.getItem('access')}`;
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = token;
  }
  return ({
    ...config,
    url: domain + config.url,
  });
});

// Intercept the response data, 1. handle data, 2. handle error
axiosInstance.interceptors.response.use((response) => response.data, () => {
  Toast.show('Server can not work');
});

// get resource
export const get = (url) => axiosInstance.get(url);

// add a new resource
export const post = (url, params) => axiosInstance.post(url, params);

// update a resource
export const put = (url, params) => axiosInstance.put(url, params);

// delete a resource
export const del = (url, params) => axiosInstance.del(url, params);
