const router = [
  {
    path: '/',
    name: 'work-add',
    meta: { requiresAuth: false },
    component: () => import(/* webpackChunkName: "work-add" */ './index'),
  },
];

export default router;
