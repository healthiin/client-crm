import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/reports/:reportId',
      name: 'Report',
      component: () => import('@/pages/ReportPage.vue'),
      props: true,
    },
  ],
});

export default router;
