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
import SongList from '../components/songlist/songlist'
import SongListComment from '../components/songlist/listcomment'
import User from '../components/others/user'
import BaseMessage from '../components/others/basemessage'
import ForWard from '../components/dynamic/forward'
import DynamicComment from '../components/dynamic/comment/dynamiccomment'
import CommentReply from '../components/common/commentreply'
import Follows from '../components/account/follows/followslist'
import FollowSinger from '../components/account/follows/followsinger'
import Followeds from '../components/account/follows/fans'
import MoreSongList from '../components/others/morelist/moresonglist'
import Singer from '../components/singer/singer'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Find',
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/login/phone',
      component: loginPhone,
      meta: {
        keepAlive: true // 需要被缓存
      }
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
      component: Code,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    // 非父子关系组件~把号码通过路由传值。
    { name: 'password',
      path: '/login/cellphone/:phone',
      component: PassWord,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/find',
      component: Find,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/video',
      component: Video,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      name: 'my',
      path: '/my',
      component: My,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/collection',
      component: MyCollectionList,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/village',
      component: Village,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/account',
      component: Account,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/follows',
      component: Follows,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/followsinger/:userId',
      component: FollowSinger,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/followeds',
      component: Followeds,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/videoplayer',
      component: Videoplayer,
      meta: {
        keepAlive: false // 不被缓存
      }
    },
    {
      path: '/videoslide',
      component: videoSlide,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/songlist/:id',
      component: SongList,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/songlistcomment/:id',
      component: SongListComment,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/user/:userId',
      component: User,
      meta: {
        keepAlive: false
      }
      // redirect: "/user/:id",
      // children: [
      //   {
      //     path: '/',
      //     component: User
      //   },
      //   {
      //     path: 'basemessage',
      //     component: BaseMessage
      //   }
      // ]
    },
    {
      path: '/basemessage',
      component: BaseMessage,
      name: 'Basemessage',
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/forward/:uid/:evId',
      component: ForWard,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/dynamiccomment',
      component: DynamicComment
    },
    {
      path: '/commentreply',
      name: 'commentreply',
      component: CommentReply,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/moresonglist',
      component: MoreSongList,
      name: 'MoreSongList',
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/singer/:userId/:id',
      component: Singer,
      meta: {
        keepAlive: false
      }
    },
  ]
})
