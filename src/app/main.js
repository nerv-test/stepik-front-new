import Vue from 'vue';
import store from '@/store';
import initPlugins from '@/plugins';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;


const app = {
  router,
  store,
  render: h => h(App),
};

initPlugins(app); // https://habr.com/post/423013/

new Vue(app).$mount('#app');
