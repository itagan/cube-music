import storage from 'good-storage'

const LIKE_VIDEO_KEY = '__like-video__'
const LIKE_VIDEO_LEN = 200

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
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

export function saveLikeVideo (video) {
  let videoLikes = storage.get(LIKE_VIDEO_KEY, [])
  insertArray(videoLikes, video, (item) => {
    return item.vid === video.vid
  }, LIKE_VIDEO_LEN)
  storage.set(LIKE_VIDEO_KEY, videoLikes)
  return videoLikes
}

export function deleteLikeVideo (video) {
  let videoLikes = storage.get(LIKE_VIDEO_KEY, [])
  deleteFromArray(videoLikes, (item) => {
    return item.vid === video.vid
  })
  storage.set(LIKE_VIDEO_KEY, videoLikes)
  return videoLikes
}
export function loadLikeVideo () {
  return storage.get(LIKE_VIDEO_KEY, [])
}
