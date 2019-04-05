const tokenKey = 'user-token';

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem(tokenKey) || '',
    status: '',
    get_whoami_is_locked: false,
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    AUTH_REQUEST({ commit, dispatch }, { email, password }) {
      return new Promise(async (resolve, reject) => { // The Promise used for router redirect in login
        commit('AUTH_REQUEST');
        try {
          const response = await this.$axios.post('v1/auth/token/', { email, password });
          // eslint-disable-next-line prefer-destructuring
          const token = response.data.access;
          localStorage.setItem(tokenKey, token); // store the token in localstorage
          this.$axios.defaults.headers.common.Authorization = `JWT ${token}`;
          commit('AUTH_SUCCESS', token);
          await dispatch('GET_WHOAMI');
          resolve(response);
        } catch (err) {
          dispatch('AUTH_LOGOUT');
          commit('AUTH_ERROR');
          reject(err);
        }
      });
    },
    async GET_WHOAMI({ state, commit }) {
      return new Promise(async (resolve, reject) => {
        if (state.user || state.get_whoami_is_locked) resolve(); // no need to fetch it one more time

        commit('SET_GET_WHOAMI_LOCK', true);

        try {
          const response = await this.$axios.get('v1/whoami/');
          commit('SET_USER', response.data);
          resolve(response);
        } catch (err) {
          reject(err);
        } finally {
          commit('SET_GET_WHOAMI_LOCK', false);
        }
      });
    },
    AUTH_LOGOUT({ commit }) {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('user-token');
        delete this.$axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_GET_WHOAMI_LOCK(state, locked) {
      state.get_whoami_is_locked = locked;
    },
    AUTH_REQUEST(state) {
      state.status = 'loading';
    },
    AUTH_SUCCESS(state, token) {
      state.status = 'success';
      state.token = token;
    },
    AUTH_ERROR(state) {
      state.status = 'error';
    },
    AUTH_LOGOUT(state) {
      state.status = '';
      state.token = '';
    },
  },
};
