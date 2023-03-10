import { get, post } from '../utils/request';

export const createTweet = (params) => post('/api/tweets/', params);

export const getTweets = (id) => get('/api/tweets', {
  user_id: id,
});

export const getFeeds = () => get('/api/newsfeeds/').then((res) => {
  if (res.data && res.data.length > 0) {
    return res.data.map((item) => ({ ...item.tweet }));
  }
  return [];
});
