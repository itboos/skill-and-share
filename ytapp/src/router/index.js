import Vue from 'vue';
import Router from 'vue-router';
import list from '@/components/list';
import play from '@/components/play';

Vue.use(Router);
// mode: 'history',
// 项目目录
const homePath = '/';
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: homePath,
      name: 'list',
      component: list,
    },
    {
      path: `${homePath}play`,
      name: 'play',
      component: play,
    },
    // {
    //   path: '/',
    //   name: 'list',
    //   component: list,
    // },
    // {
    //   path: '/play',
    //   name: 'play',
    //   component: play,
    // },
    // {
    //   path: '*',
    //   name: 'play2',
    //   component: list,
    // },
  ],
});
