import { get, post } from '../utils/request';

export const getProfessors = (params) => post('/api/keywords/keyword_faculty/', params);
export const getPublications = (params) => post('/api/keywords/keyword_publication/', params);
export const postProfessorsRank = (params) => post('/api/faculty/get_professors_group_score/', params);
export const getTweets = (id) => get(`/api/tweets/?user_id=${id}`);
