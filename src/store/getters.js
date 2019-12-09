import Video from '../common/js/video'


export const token = state => state.token
export const loginState = state => state.loginState
export const currentVid = state => state.currentVid
export const limit = state => state.limit
export const hotLimit = state => state.hotLimit
export const back = state => state.back
export const videoList = state => state.videoList
export const videoCurrentTime = state => state.videoCurrentTime
export const currentIndex = state => state.currentIndex
export const currentVideo = (state) => {
  return state.videoList[state.currentIndex] || {}
}
export const currentUrl = state => state.currentUrl
export const uid = state => state.uid
export const videoGroupId = state => state.videoGroupId
export const videoState = state => state.videoState

export const videoLikesList = (state) => {
  return state.videoLikesList.map((video) => {
    return new Video(video)
  })
}
