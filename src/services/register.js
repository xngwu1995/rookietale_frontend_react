import { get, post } from '@utils/request';

export const loginService = () => get('/api/accounts/login_status/');

export const registerUser = (params) => post('/api/accounts/signup/', params);
