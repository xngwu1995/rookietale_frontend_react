import { post } from '../utils/request';

export const createTweet = (params) => post('/api/tweets/', params);
