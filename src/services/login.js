import { post } from '../utils/request';

export const login = (params) => post('/api/accounts/login/', params);
