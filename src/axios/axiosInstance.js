import axios from 'axios';
const BASE_URL = 'http://api-laravel-project/api/V1';


export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




