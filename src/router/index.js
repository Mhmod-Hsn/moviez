import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '../views/Movies.vue')
    },
    {
      path: '/favourite',
      name: 'Favourite',
      component: () => import(/* webpackChunkName: "about" */ '../views/Favourite.vue')
    },
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "v-list-item",
  linkExactActiveClass: "v-list-item--active",
});

export default router
