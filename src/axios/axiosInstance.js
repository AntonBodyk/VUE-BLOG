import axios from 'axios';
const BASE_URL = 'http://api-laravel-project/api/V1'

function request(){
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return wait(300)
      .then(() => fetch(BASE_URL + url, options))
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
  
        return response.json();
      });
}


export const client = {
  get: (url) => request(url),
  post: (url, data) => request(url, 'POST', data),
  patch: (url, data) => request(url, 'PATCH', data),
  delete: (url) => request(url, 'DELETE'),
};
