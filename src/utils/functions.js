import axios from 'axios';
import { apiRoute } from './constants';

export const _get = (route, params) => {
  return new Promise((resolve, reject) => {
    axios.get(apiRoute + route, { params })
      .then((response) => resolve(response?.data || null))
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject({
            message: 'An unexpected error occurred',
            code: 'CLI500',
          });
        }
      });
  });
};

export const _post = (route, option) => {
  return new Promise((resolve, reject) => {
    axios.post(apiRoute + route, option)
      .then((response) => resolve(response?.data))
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject({
            message: 'An unexpected error occurred',
            code: 'CLI500',
          });
        }
      });
  });
};
