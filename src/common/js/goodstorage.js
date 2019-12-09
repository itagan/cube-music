import storage from 'good-storage'

const COLLECT_VIDEO_KEY = '__collect-video__'
const COLLECT_VIDEO_LEN = 200
const CURRENT_VIDEO_KEY = '__collect-video__'
const CURRENT_VIDEO_LEN = 1

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === -1) {
    return
  }
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

export function saveCurrentVideo (video) {
  let _currentVideo = storage.get(CURRENT_VIDEO_KEY, [])
  insertArray( _currentVideo, video, (item) => {
    return item.vid === video.vid
  }, CURRENT_VIDEO_LEN)
  storage.set(CURRENT_VIDEO_KEY, _currentVideo)
  return _currentVideo
}

export function deleteCurrentVideo (video) {
  let _currentVideo = storage.get(CURRENT_VIDEO_KEY, [])
  deleteFromArray( _currentVideo, (item) => {
    return item.vid === video.vid
  })
  storage.set(CURRENT_VIDEO_KEY, _currentVideo)
  return _currentVideo
}

export function loadCurrentVideo () {
  return storage.get(CURRENT_VIDEO_KEY, [])
}

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
