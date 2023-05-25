import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MainLayout from '../views/MainLayout.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
