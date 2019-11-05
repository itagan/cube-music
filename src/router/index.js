import Vue from 'vue'
import Router from 'vue-router'
import Find from '../components/find/find'
import Video from '../components/video/video'
import My from '../components/my/my'
import Village from '../components/village/village'
import Account from '../components/account/account'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Find'
    },
    {
      path:'/find',
      component:Find
    },
    {
      path:'/video',
      component:Video
    },
    {
      path:'/my',
      component:My
    },
    {
      path:'/village',
      component:Village
    },
    {
      path:'/account',
      component:Account
    }

  ]
})
