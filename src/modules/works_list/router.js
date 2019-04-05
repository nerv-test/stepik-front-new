const router = [
  {
    path: '/admin',
    name: 'works-list',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "works-list" */ './index'),
  },
];

export default router;
