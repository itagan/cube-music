import 'amfe-flexible'
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from './store'  //注册store全局使用
import './common/stylus/index.styl'
// import { Toast } from 'cube-ui'


Vue.use(Cube); //全局引入注册cube-ui
// Vue.use(Toast);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
