import { post } from '../utils/request';

export const createComment = (params) => post('/api/comments/', params);
