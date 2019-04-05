const router = [
  {
    path: '/admin/review/:id(\\d+)',
    name: 'work-details',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "work-details" */ './index'),
  },
];


export default router;
