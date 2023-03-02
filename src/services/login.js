import { post } from '../utils/request';

export const login = (params) => post('/api/accounts/login/', params);

export const register = (username, password) => post(`/api/users/${username}/${password}`);
