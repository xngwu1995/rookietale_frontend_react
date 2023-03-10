import { post, put } from '@utils/request';

export const registerUser = (params) => post('/api/accounts/signup/', params);

export const editUser = (userId, params) => put(`api/profiles/${userId}`, params);
