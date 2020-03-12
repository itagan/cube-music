import Vue from 'vue'
import Vuex from 'vuex'
// as语法
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 安装插件，当通过mutations修改state的时候控制台会输出，方便看到修改日志

// 全局注册使用插件
Vue.use(Vuex)

// 检测是否通过mutation修改
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // debug为true,开启严格模式
  plugins: debug ? [createLogger()] : [] // 使用默认插件
})
