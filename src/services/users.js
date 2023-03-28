import { get, post } from '../utils/request';

export const getUser = (id) => get(`/api/users/${id}`);

export const getRandomUser = () => get('/api/users/random_users/');

// Follow a user
export const followUser = (userId) => post(`/api/friendships/${userId}/follow/`);

// Unfollow a user
export const unFollowUser = (userId) => post(`/api/friendships/${userId}/unfollow/`);

// Get fans
export const getFollowers = (userId, page, pageSize) => get(`/api/friendships/${userId}/followers/?page=${page}&page_size=${pageSize}`);

// Get my followings
export const getFollowings = (userId, page, pageSize) => get(`/api/friendships/${userId}/followings/?page=${page}&page_size=${pageSize}`);
