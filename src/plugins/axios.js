import axios from 'axios';

export default function ({ store: { dispatch } }, inject) {
  axios.defaults.baseURL = `${process.env.VUE_APP_BACKEND}/api`;
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const token = localStorage.getItem('user-token');
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  }

  axios.interceptors.response.use(undefined, err => new Promise(() => {
    if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
      dispatch('auth/AUTH_LOGOUT');
      // you can also redirect to /login if needed !
    }
    throw err;
  }));

  inject('axios', axios);
}
