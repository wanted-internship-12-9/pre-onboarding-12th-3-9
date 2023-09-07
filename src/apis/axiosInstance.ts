import axios from 'axios';

import { MOCK_API_URL } from './apiConfig';

export const axiosInstance = axios.create({
  baseURL: MOCK_API_URL,
});
