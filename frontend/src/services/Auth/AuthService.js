import axiosClient from '../AxiosClient/axiosClient';

const AuthService = {
  isLoggedIn: () => {
    let token = localStorage.getItem('token');
    if (token === undefined || token === null) {
      return false;
    }
    return true;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
  removeToken: () => {
    localStorage.removeItem('token');
  },

  loginByEmailPassword: (data) => {
    return axiosClient.post('login', data);
  },
  signUp: (data) => {
    return axiosClient.post('signup', data);
  },
};

export default AuthService;
