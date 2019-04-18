import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Entries from './views/Entries.vue';
import Edit from './views/Edit.vue'
import Login from './views/Login.vue';
import PictureView from './views/PictureView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/entries',
      name: 'entries',
      component: Entries,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
       path: '/login',
       name: 'login',
       component: Login,
     },
     {
        path: '/picture-view/:id',
        name: 'pictureView',
        component: PictureView,
      },
  ],
});
