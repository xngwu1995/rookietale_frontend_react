import { get, post } from '../utils/request';

export const createTweet = (params) => post('/api/tweets/', params);

export const getTweets = (id) => get(`/api/tweets/?user_id=${id}`);
export const getTweetDetails = (id) => get(`/api/tweets/${id}`);
export const getFeeds = () => get('/api/newsfeeds/');
