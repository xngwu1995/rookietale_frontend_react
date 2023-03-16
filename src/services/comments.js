import { get, post } from '../utils/request';

export const createComment = (params) => post('/api/comments/', params);
export const getComments = (id) => get(`/api/comments/?tweet_id=${id}`);
export const Like = (params) => post('/api/likes/', params);
export const cancelLike = (params) => post('/api/likes/cancel/', params);
