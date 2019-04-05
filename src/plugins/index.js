import Vue from 'vue';
import axios from './axios';

export default function (app) {
  const inject = (name, plugin) => {
    const key = `$${name}`;
    app[key] = plugin;
    app.store[key] = plugin;

    Vue.use(() => {
      // eslint-disable-next-line no-prototype-builtins
      if (Vue.prototype.hasOwnProperty(key)) return;

      Object.defineProperty(Vue.prototype, key, {
        get() {
          return this.$root.$options[key];
        },
      });
    });
  };

  axios(app, inject);
}
