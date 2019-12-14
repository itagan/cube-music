import 'amfe-flexible'
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from './store'  // 注册store全局使用
import './common/stylus/index.styl'
import api from './api/api'
// import { Toast } from 'cube-ui'
import dialog from './assets/js/dialog'
import {debounce} from './assets/js/debounce'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.use(VueLazyload)
Vue.use(Cube) // 全局引入注册cube-ui
// Vue.use(Toast);
Vue.prototype.$api = api // 将api挂载到vue的原型上.方便全局调用
Vue.prototype.$debounce = debounce
Vue.prototype._dialog = dialog

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
