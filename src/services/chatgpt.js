import { post } from '../utils/request';

export const askChatGPT = (params) => post('/api/chatgpt/ask_chatgpt/', params);
