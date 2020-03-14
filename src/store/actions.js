import * as types from './mutations-types'
import { saveCollectVideo, deleteCollectVideo, saveCurrentVideo, deleteCurrentVideo, saveOperation, deleteOperation, saveCurrentDynamic, saveCurrentAuthor, saveToken } from '../common/js/goodstorage'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/util'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const loginState = function ({commit, state}, {loginState}) {
  commit(types.SET_LOGIN, loginState)
}
// 视频播放有关
export const video = function ({commit, state}, {vid, index, videoList, currentUrl, videoGroupId}) {
  commit(types.SET_CURRENT_VID, vid)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_VIDEO_LIST, videoList)// 视频列表流 前后播放的视频进度
  commit(types.SET_CURRENT_URL, currentUrl)
  commit(types.SET_VIDEO_GROUP_ID, videoGroupId) // 视频流列表组id
}
// 评论上拉加载有关
export const comment = function ({commit, state}, {limit, hotLimit}) {
  commit(types.SET_LIMIT, limit)
  commit(types.SET_HOT_LIMIT, hotLimit)
}
// 评论是否提前展示
export const commentBack = function ({commit, state}, {back}) {
  commit(types.SET_BACK, back)
}
export const setCurrentTimes = function ({commit, state}, {videoCurrentTime}) {
  commit(types.SET_VIDEO_CURRENT_TIME, videoCurrentTime)
}
// 用户相关
export const User = function ({commit, state}, {uid}) {
  commit(types.SET_UID, uid)
}
// 视频操作情况
export const videoOperation = function ({commit, state}, {videoState}) {
  commit(types.SET_VIDEO_STATE, videoState)
}

export const saveVideoCollectionsList = function ({ commit }, video) {
  commit(types.SET_VIDEO_COLLECTIONS_LIST, saveCollectVideo(video))
}

export const deleteVideoCollectionsList = function ({ commit }, video) {
  commit(types.SET_VIDEO_COLLECTIONS_LIST, deleteCollectVideo(video))
}

export const saveCurrentVideoList = function ({commit, state}, currentVideo) {
  commit(types.SET_CURRENT_VIDEO, saveCurrentVideo(currentVideo))
}

export const deleteCurrentVideoList = function ({commit, state}, currentVideo) {
  commit(types.SET_CURRENT_VIDEO, deleteCurrentVideo(currentVideo))
}
// 资源操作，点赞收藏等
export const saveOperationList = function ({commit, state}, operation) {
  commit(types.SET_OPERATION, saveOperation(operation))
}

export const deleteOperationList = function ({commit, state}, operation) {
  commit(types.SET_OPERATION, deleteOperation(operation))
}

// 动态
export const saveDynamic = function ({commit}, dynamic) {
  commit(types.SET_DYNAMIC, saveCurrentDynamic(dynamic))
}
// 判断评论是否作者
export const saveAuthor = function ({commit}, author) {
  commit(types.SET_AUTHOR, saveCurrentAuthor(author))
}
// 判断评论是否作者
export const saveMyToken = function ({commit}, token) {
  commit(types.SET_TOKEN, saveToken(token))
}
// 歌曲电台播放有关
export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
