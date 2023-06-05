import axios from 'axios';
import { BASE_URL } from 'consts';

export const http = axios.create({
  baseURL: BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
