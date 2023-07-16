import { get, post } from '../utils/request';

export const getAllProfessors = () => get('/api/faculty/get_all_professors/');
export const getAllUnvProfessors = (name) => get(`/api/faculty/get_university_professors/?university=${name}`);
export const getAllUniversities = () => get('api/universities/all_universities');
export const getProfessors = (params) => post('/api/keywords/keyword_faculty/', params);
export const getPublications = (params) => post('/api/keywords/keyword_publication/', params);
export const postProfessorsRank = (params) => post('/api/faculty/get_professors_group_score/', params);
export const getFaculty = (params) => post('/api/mangodb/get-top10-faculty-university/', params);
export const getRecommendFaculty = (params) => post('/api/neo4j/get-recommend-faculty/', params);
export const getTweets = (id) => get(`/api/tweets/?user_id=${id}`);
