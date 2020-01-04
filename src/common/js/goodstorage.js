/**
 本地存储操作 部分写法来自黄老师vue-music课程
 引进插件
 前置，处理方法，具体存储设置获取删除操作
 **/

import storage from 'good-storage'

const COLLECT_VIDEO_KEY = '__collect-video__'
const COLLECT_VIDEO_LEN = 200
const CURRENT_VIDEO_KEY = '__current-video__'
const CURRENT_VIDEO_LEN = 1
const CURRENT_OPERATION_KEY = '__current-operation__'
const CURRENT_OPERATION_LEN = 1
const CURRENT_DYNAMIC_KEY = '__dynamic__'
const CURRENT_DYNAMIC_LEN = 1
const CURRENT_AUTHOR_KEY = '__author__'
const CURRENT_AUTHOR_LEN = 1

// 公共方法设置
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }  // 解决刚开始为空的问题，所以不能-1
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 当前视频
export function saveCurrentVideo (video) {
  let _currentVideo = storage.get(CURRENT_VIDEO_KEY, [])
  insertArray(_currentVideo, video, (item) => {
    return item.vid === video.vid
  }, CURRENT_VIDEO_LEN)
  storage.set(CURRENT_VIDEO_KEY, _currentVideo)
  return _currentVideo
}
export function deleteCurrentVideo (video) {
  let _currentVideo = storage.get(CURRENT_VIDEO_KEY, [])
  deleteFromArray(_currentVideo, (item) => {
    return item.vid === video.vid
  })
  storage.set(CURRENT_VIDEO_KEY, _currentVideo)
  return _currentVideo
}
export function loadCurrentVideo () {
  return storage.get(CURRENT_VIDEO_KEY, [])
}
// 视频收藏历史记录
export function saveCollectVideo (video) {
  let videoCollections = storage.get(COLLECT_VIDEO_KEY, [])
  insertArray(videoCollections, video, (item) => {
    return item.vid === video.vid
  }, COLLECT_VIDEO_LEN)
  storage.set(COLLECT_VIDEO_KEY, videoCollections)
  return videoCollections
}
export function deleteCollectVideo (video) {
  let videoCollections = storage.get(COLLECT_VIDEO_KEY, [])
  deleteFromArray(videoCollections, (item) => {
    return item.vid === video.vid
  })
  storage.set(COLLECT_VIDEO_KEY, videoCollections)
  return videoCollections
}
export function loadCollectVideo () {
  return storage.get(COLLECT_VIDEO_KEY, [])
}
// 是否已经对当前视频等资源操作过，如点赞，收藏,关注，播放进度等
export function saveOperation (value) {
  let _currentOperation = storage.get(CURRENT_VIDEO_KEY, [])
  insertArray(_currentOperation, value, (item) => {
    return item.id === value.id
  }, CURRENT_OPERATION_LEN)
  storage.set(CURRENT_OPERATION_KEY, _currentOperation)
  return _currentOperation
}
export function deleteOperation (value) {
  let _currentOperation = storage.get(CURRENT_OPERATION_KEY, [])
  deleteFromArray(_currentOperation, (item) => {
    return item.id === value.id
  })
  storage.set(CURRENT_OPERATION_KEY, _currentOperation)
  return _currentOperation
}
export function loadOperation () {
  return storage.get(CURRENT_OPERATION_KEY, [])
}
// 当前动态
export function saveCurrentDynamic (dynamic) {
  let _currentDynamic = storage.get(CURRENT_DYNAMIC_KEY, [])
  insertArray(_currentDynamic, dynamic, (item) => {
    return item.id === dynamic.id
  }, CURRENT_DYNAMIC_LEN)
  storage.set(CURRENT_DYNAMIC_KEY, _currentDynamic)
  return _currentDynamic
}
export function deleteCurrentDynamic (dynamic) {
  let _currentDynamic = storage.get(CURRENT_DYNAMIC_KEY, [])
  deleteFromArray(_currentDynamic, (item) => {
    return item.id === dynamic.id
  })
  storage.set(CURRENT_DYNAMIC_KEY, _currentDynamic)
  return _currentDynamic
}
export function loadCurrentDynamic () {
  return storage.get(CURRENT_DYNAMIC_KEY, [])
}

// 当前作者
export function saveCurrentAuthor (author) {
  let _currentAuthor = storage.get(CURRENT_AUTHOR_KEY, [])
  insertArray(_currentAuthor, author, (item) => {
    return item.userId === author.userId
  }, CURRENT_AUTHOR_LEN)
  storage.set(CURRENT_AUTHOR_KEY, _currentAuthor)
  return _currentAuthor
}
export function deleteCurrentAuthor (author) {
  let _currentAuthor = storage.get(CURRENT_AUTHOR_KEY, [])
  deleteFromArray(_currentAuthor, (item) => {
    return item.userId === author.userId
  })
  storage.set(CURRENT_AUTHOR_KEY, _currentAuthor)
  return _currentAuthor
}
export function loadCurrentAuthor () {
  return storage.get(CURRENT_AUTHOR_KEY, [])
}
