import { get, post } from '../utils/request';

export const createTweet = (params) => post('/api/tweets/', params);

export const getTweets = (id, key) => get(`/api/tweets/?user_id=${id}&type=${key}`);
export const getMoreTweets = (id, key, lttime) => get(`/api/tweets/?user_id=${id}&type=${key}&created_at__lt=${lttime}`);
export const getTweetDetails = (id) => get(`/api/tweets/${id}`);
export const getFeeds = () => get('/api/newsfeeds/');
export const getMoreFeeds = (lttime) => get(`/api/newsfeeds/?created_at__lt=${lttime}`);
