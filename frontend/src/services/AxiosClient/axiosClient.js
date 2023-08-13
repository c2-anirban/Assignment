import axios from 'axios';

import AuthService from '../Auth/AuthService';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
});

axiosClient.interceptors.request.use(
  (req) => {
    const token = AuthService.getToken();
    if (token) {
      AuthService.setToken(token)
      req.headers.common.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      AuthService.removeToken();
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export default axiosClient;

