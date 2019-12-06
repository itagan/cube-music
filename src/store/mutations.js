// 定义操作：提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
import * as types from './mutations-types'

const mutations = {
  // 注意下边里有空格
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_LOGIN] (state, loginState) {
    state.loginState = loginState
  },
  [types.SET_CURRENT_VID] (state, currentVid) {
    state.currentVid = currentVid
  },
  [types.SET_LIMIT] (state, limit) {
    state.limit = limit
  },
  [types.SET_HOT_LIMIT] (state, hotLimit) {
    state.hotLimit = hotLimit
  },
  [types.SET_BACK] (state, back) {
    state.back = back
  },
  [types.SET_VIDEO_LIST] (state, videoList) {
    state.videoList = videoList
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_VIDEO_CURRENT_TIME] (state, videoCurrentTime) {
    state.videoCurrentTime = videoCurrentTime
  },
  [types.SET_CURRENT_URL] (state, currentUrl) {
    state.currentUrl = currentUrl
  },
  [types.SET_UID] (state, uid) {
    state.uid = uid
  },
  [types.SET_VIDEO_GROUP_ID] (state, videoGroupId) {
    state.videoGroupId = videoGroupId
  },
  [types.SET_VIDEO_STATE] (state, videoState) {
    state.videoState = videoState
  }
}

export default mutations
