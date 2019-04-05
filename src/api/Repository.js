import axios from 'axios';
import store from '@/store';


// Set config defaults when creating the instance
const repository = axios.create();

// Alter defaults after instance has been created
repository.defaults.baseURL = `${process.env.VUE_APP_BACKEND}/api`;
repository.defaults.headers.common.Accept = 'application/json';
repository.defaults.headers.post['Content-Type'] = 'application/json';

const token = localStorage.getItem('user-token');
if (token) {
  repository.defaults.headers.common.Authorization = `JWT ${token}`;
}

repository.interceptors.response.use(undefined, err => new Promise(() => {
  if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
    // if you ever get an unauthorized, logout the user
    store.dispatch('auth/AUTH_LOGOUT');
  }
  throw err;
}));

export default repository;
