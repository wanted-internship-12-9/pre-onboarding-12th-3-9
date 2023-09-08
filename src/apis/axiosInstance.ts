import axios from 'axios';

import { API_URL } from './apiConfig';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
