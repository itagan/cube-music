import { loadCurrentVideo, loadOperation, loadCurrentDynamic, loadCurrentAuthor } from '../common/js/goodstorage'

export const token = state => state.token
export const loginState = state => state.loginState
export const currentVid = state => state.currentVid
export const limit = state => state.limit
export const hotLimit = state => state.hotLimit
export const back = state => state.back
export const videoList = state => state.videoList
export const videoCurrentTime = state => state.videoCurrentTime
export const currentIndex = state => state.currentIndex
export const currentUrl = state => state.currentUrl
export const uid = state => state.uid
export const videoGroupId = state => state.videoGroupId

export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode

// export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const videoCollectionsList = (state) => {
  return state.videoCollectionsList.map((video) => {
    return new Video(video)
  })
}
// export const currentVideo = state => state.currentVideo
// 解决刷新vuex清空页面报错问题，从本地存储获取值。组件watch值变化，从而更新
export const currentVideo = (state) => {
  if (!state.currentVideo.length) {
      // state.currentVideo = loadCurrentVideo() 这样做将改变vuex导致警告报错
    return loadCurrentVideo()
  }
  return state.currentVideo
}

export const operation = (state) => {
  if (!state.operation.length) {
    return loadOperation()
  }
  return state.operation
}

export const dynamic = (state) => {
  if (!state.dynamic.length) {
    return loadCurrentDynamic()
  }
  return state.dynamic
}

export const author = (state) => {
  if (!state.author.length) {
    return loadCurrentAuthor()
  }
  return state.author
}
