import { get, post } from '../utils/request';

export const loginService = () => get('/api/accounts/login_status/');

export const register = (username, password) => post(`/api/users/${username}/${password}`);
