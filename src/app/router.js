import Vue from 'vue';
import { createRouterLayout } from '@/app/utils/layout';
import store from '@/store';

import AuthRouter from '@/modules/auth/router';
import WorkAddRouter from '@/modules/work_add/router';
import WorkDetailsRouter from '@/modules/work_details/router';
import WorksListRouter from '@/modules/works_list/router';

import Router from 'vue-router';

// Create <RouterLayout> component.
const RouterLayout = createRouterLayout(layout =>
  // Resolves a layout component with layout type string.
  import(`@/layouts/${layout}.vue`));

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',

      // Pass <RouterLayout> as the route component
      component: RouterLayout,

      // All child components will be applied with corresponding layout component
      children: [
        ...AuthRouter,
        ...WorkAddRouter,
        ...WorksListRouter,
        ...WorkDetailsRouter,
      ],
    },
  ],
});


router.beforeEach(async (to, from, next) => {
  const { t } = to.query;
  if (![null, undefined, ''].includes(t)) {
    try {
      await store.dispatch('auth/AUTH_REQUEST', { t });
      return next();
    } catch (e) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  }
  // Check if auth is required on this route
  // (including nested routes).
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);

  if (store.getters['auth/isAuthenticated']) {
    await store.dispatch('auth/GET_WHOAMI');
  }

  // If auth isn't required for the route, just continue.
  if (!requiresAuth) return next();

  if (!store.getters['auth/isAuthenticated']) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
