import Vue from 'vue'
import Router from 'vue-router'
import Find from '../components/find/find'
import Video from '../components/video/video'
import My from '../components/my/my'
import Village from '../components/village/village'
import Account from '../components/account/account'
import Videoplayer from '../components/videoplayer/videoplayer'
import Login from '../components/user/login'
import loginPhone from '../components/user/loginphone'
import Code from '../components/user/code'
import PassWord from '../components/user/loginpassword'
import videoSlide from '../components/common/videoslide'
import MyCollectionList from '../components/mycollection/collectionlist'
import SongList from "../components/songlist/songlist"
import SongListComment from "../components/songlist/listcomment"
import User from "../components/others/user"
import BaseMessage from "../components/others/basemessage"
import ForWard from "../components/dynamic/forward"


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Find'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/login/phone',
      component: loginPhone
      // children:[
      //   {
      //     path:':phone',
      //     component:Code
      //   },
      // ]
    },
    // 非父子关系组件~把号码通过路由传值。
    { name: 'code',
      path: '/login/phone/:phone',
      component: Code
    },
    // 非父子关系组件~把号码通过路由传值。
    { name: 'password',
      path: '/login/cellphone/:phone',
      component: PassWord
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/video',
      component: Video
    },
    {
      name:'my',
      path: '/my',
      component: My,
      // children: [
      //   {
      //     path:'/my/collection',
      //     component:MyCollectionList
      //   }
      // ]
    },
    {
      path:'/collection',
      component:MyCollectionList
    },
    {
      path: '/village',
      component: Village
    },
    {
      path: '/account',
      component: Account
    },
    {
      path: '/videoplayer',
      component: Videoplayer
    },
    {
      path: '/videoslide',
      component: videoSlide
    },
    {
      path: '/songlist',
      component: SongList
    },
    {
      path: '/songlistcomment',
      component: SongListComment
    },
    {
      path: '/user/:id',
      component: User
    },
    {
      path: '/basemessage',
      component: BaseMessage
    },
    {
      path: '/forward/:uid/:evId',
      component: ForWard
    },
  ]
})
