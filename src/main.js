import 'amfe-flexible'
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'

Vue.use(Cube)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
