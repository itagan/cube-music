import axios from './http'
const base = 'http://localhost:3000' // 定义默认基准地址

// 登录有关
const login = {
  login () {
    return axios.get(`${base}/`)
  }
}

// find页面
const find = {
  // 轮播图
  slide () {
    return axios.get(`${base}/banner?type=2`)
  },
  // 推荐歌曲
  recommend () {
    return axios.get(`${base}/personalized?limit=6`)
  }
}

// 视频相关
const video = {
   // 获取视频标签列表
  videoGroupLists () {
    return axios.get(`${base}/video/group/list`)
  },
   // 获取视频标签下的视频
  videolist (id = 9102) {
    return axios.get(`${base}/video/group?id=${id}`)
  },
   // 相关视频
  allvideo (vid) {
    return axios.get(`${base}/related/allvideo?id=${vid}`)
  },
   // 获取视频详情
  video (vid) {
    return axios.get(`${base}/video/detail?id=${vid}`)
  },
   // 获取视频播放地址
  videourl (vid) {
    return axios.get(`${base}/video/url?id=${vid}`)
  },
   // 获取视频精彩评论
  hotcomment (vid, limit = 20) {
    return axios.get(`${base}/comment/hot?id=${vid}&type=5&limit=${limit}`)
  },
   // 获取视频最新评论
  newcomment (vid, limit = 20) {
    return axios.get(`${base}/comment/video?id=${vid}&limit=${limit}`)
  },
   // 获取全部mv
  allmvs () {
    return axios.get(`${base}/mv/all`)
  }
}

 // 用户有关
const users = {
  // 刷新登录
  refresh () {
    return axios.get(`${base}/login/refresh`)
  },
  // 退出登录
  logout () {
    return axios.get(`${base}/logout`)
  },
  // 登录状态
  status () {
    return axios.get(`${base}/login/status`)
  },
  // 手机登录
  cellphone (phonenumber, password) {
    return axios.get(`${base}/login/cellphone?phone=${phonenumber}&password=${password}`)
  },
  // 发送验证码
  sendCode (phonenumber) {
    return axios.get(`${base}/captcha/sent?phone=${phonenumber}`)
  },
  // 验证验证码
  verifyCode (phonenumber, code) {
    return axios.get(`${base}/captcha/verify?phone=${phonenumber}&captcha=${code}`)
  },
  // 注册(修改密码)
  register (phonenumber, password, code, nickname) {
    return axios.get(`${base}/register/cellphone?phone=${phonenumber}&password=${password}&captcha=${code}&nickname=${nickname}`)
  },
  // 检测手机号码是否已注册
  existence (phonenumber) {
    return axios.get(`${base}/cellphone/existence/check?phone=${phonenumber}`)
  },
  // 初始化昵称
  nickname (nickname) {
    return axios.get(`${base}/activate/init/profile?nickname=${nickname}`)
  },
  // 更换绑定手机
  rebind (phonenumber, oldcode, newcode) {
    return axios.get(`${base}/rebind?phone=${phonenumber}&oldcaptcha=${oldcode}&captcha=${newcode}`)
  },
  // 获取用户详情
  userdetail (uid) {
    return axios.get(`${base}/user/detail?uid=${uid}`)
  },
  // 获取用户信息 , 歌单，收藏，mv, dj 数量
  usermsg () {
    return axios.get(`${base}/user/subcount`)
  },
  // 更新用户信息
  userUpdate (gender, signature, city, nickname, birthday, province) {
    return axios.get(`${base}/user/update?gender=${gender}&signature=${signature}&city=${city}&nickname=${nickname}&birthday=${birthday}&province=${province}`)
  },
  // 获取用户歌单
  playlist (uid) {
    return axios.get(`${base}/user/playlist?uid=${uid}`)
  },
  // 获取用户动态
  getDynamic (uid, limit = 10, lasttime = -1) {
    return axios.get(`${base}/user/event?uid=${uid}&limit=${limit}&lasttime=${lasttime}`)
  },
  // 转发动态
  forWardDynamic (evId, uid, forwards) {
    return axios.get(`${base}/event/forward?evId=${evId}&uid=${uid}&forwards=${forwards}`)
  },
  // 获取动态评论
  dynamicComment (threadId, limit = 50) {
    return axios.get(`${base}/comment/event?threadId=${threadId}&limit=${limit}`)
  },
  // 获取用户关注列表
  userFollows (uid, offset) {
    return axios.get(`${base}/user/follows?uid=${uid}&offset=${offset}&limit=30`)
  },
  // 获取用户粉丝列表
  userFans (uid) {
    return axios.get(`${base}/user/followeds?uid=${uid}`)
  },
  // 关注用户
  toFollow (uid, t) {
    return axios.get(`${base}/follow?id=${uid}&t=${t}`)
  }
}

// 播放歌单有关
const playlists = {
  // 新建歌单
  createlist (name, privacy) {
    return axios.get(`${base}/playlist/create?name=${name}&privacy=${privacy}`)
  }
}

// 点赞
const likes = {
  // 资源点赞( MV,电台,视频) t: 操作,1 为点赞,其他未取消点赞
  isLike (is, type, id) {
    return axios.get(`${base}/resource/like?t=${is}&type=${type}&id=${id}`)
  },
  // 给动态点赞
  dynamic (is, threadId) {
    return axios.get(`${base}/resource/like?t=${is}&type=6&threadId=${threadId}`)
  },
  // 给评论点赞
  commentLike (id, cid, is, type) {
    return axios.get(`${base}/comment/like?id=${id}&cid=${cid}&t=${is}&type=${type}`)
  },
  // 给动态评论点赞
  commentDynamic (cid, threadId, is) {
    return axios.get(`${base}/comment/like?type=6&cid=${cid}&threadId=${threadId}&t=${is}`)
  }
}
// 收藏功能
const subs = {
  // 资源点赞( MV,电台,视频) t: 操作,1 为点赞,其他未取消点赞
  isVideoSub (is, id) {
    return axios.get(`${base}/video/sub?t=${is}&id=${id}`)
  },
  // 给动态点赞
  dynamic (is, threadId) {
    return axios.get(`${base}/resource/like?t=${is}&type=6&threadId=${threadId}`)
  },
  // 给评论点赞
  commentLike (id, cid, is, type) {
    return axios.get(`${base}/comment/like?id=${id}&cid=${cid}&t=${is}&type=${type}`)
  },
  // 给动态评论点赞
  commentDynamic (cid, threadId, is) {
    return axios.get(`${base}/comment/like?type=6&cid=${cid}&threadId=${threadId}&t=${is}`)
  },
  albums (offset = 0) {
    return axios.get(`${base}/album/sublist?offset=${offset}`)
  },
  singers () {
    return axios.get(`${base}/artist/sublist`)
  },
  subVideos (offset = 0) {
    return axios.get(`${base}/mv/sublist?offset=${offset}`)
  }
}
// 歌单有关
const songLists = {
  songList (id = 2410346874) {
    return axios.get(`${base}/playlist/detail?id=${id}`)
  },
  songListComment (id = 705123491, offset = 0) {
    return axios.get(`${base}/comment/playlist?id=${id}&offset=${offset}`)
  },
  // 歌单收藏
  subscribe (is, id) {
    return axios.get(`${base}/playlist/subscribe?t=${is}&id=${id}`)
  },
  updatedesc (id, desc) {
    return axios.get(`${base}/playlist/desc/update?id=${id}&desc=${desc}`)
  },
  updatename (id, name) {
    return axios.get(`${base}/playlist/name/update?id=${id}&name=${name}`)
  },
  updatetags (id, tags) {
    return axios.get(`${base}/playlist/tags/update?id=${id}&tags=${tags}`)
  },
  // 对歌单添加或删除歌曲
  addDel (op, pid, trackId) {
    return axios.get(`${base}/playlist/tracks?op=${op}&pid=${pid}&tracks=${trackId}`)
  },
  // 新建歌单
  createlist (name, privacy) {
    return axios.get(`${base}/playlist/create?name=${name}&privacy=${privacy}`)
  }
}
// 评论功能
const commentFeature = {
  dynamicSend (threadId, content) {
    return axios.get(`${base}/comment?t=1&type=6&threadId=${threadId}&content=${content}`)
  },
  dynamicReply (threadId, commentId, content) {
    return axios.get(`${base}/comment?t=2&type=6&threadId=${threadId}&commentId=${commentId}&content=${content}`)
  },
  dynamicDelete (threadId, commentId) {
    return axios.get(`${base}/comment?t=0&type=6&threadId=${threadId}&commentId=${commentId}`)
  },
  commentSend (type, id, content) {
    return axios.get(`${base}/comment?t=1&type=${type}&id=${id}&content=${content}`)
  },
  commentReply (type, id, commentId, content) {
    return axios.get(`${base}/comment?t=2&type=${type}&id=${id}&commentId=${commentId}&content=${content}`)
  },
  commentDelete (type, commentId) {
    return axios.get(`${base}/comment?t=0&type=${type}&id=5436712&commentId=${commentId}`)
  }
}

// 歌手有关
const singers = {
  songList (id = 2410346874) {
    return axios.get(`${base}/playlist/detail?id=${id}`)
  },
  singermusic (id = 189873) {
    return axios.get(`${base}/artists?id=${id}`)
  },
  singerdesc (id = 189873) {
    return axios.get(`${base}/artist/desc?id=${id}`)
  },
  singeralbum (id = 189873, limit = 20, offset = 0) {
    return axios.get(`${base}/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
  },
  singermv (id = 189873) {
    return axios.get(`${base}/artist/mv?id=${id}`)
  }
}

// 歌曲有关
const musics = {
  newmusic (type) {
    return axios.get(`${base}/top/song?type=${type}`)
  }
}

// 专辑有关
const albums = {
  newalbum (offset = 0, limit = 20) {
    return axios.get(`${base}/top/album?offset=${offset}&limit=${limit}`)
  },
  homenewalbum () {
    return axios.get(`${base}/album/newest`)
  },
  album (id) {
    return axios.get(`${base}/album?id=${id}`)
  },
  albumdym (id) {
    return axios.get(`${base}/album/detail/dynamic?id=${id}`)
  },
  subalbum (is, id) {
    return axios.get(`${base}/album/sub?t=${is}&id=${id}`)
  },
  albumcomment (id, offset = 0, limit = 20) {
    return axios.get(`${base}/comment/album?id=${id}&offset=${offset}&limit=${limit}`)
  }
}

// 搜索
const searchs = {
  search (keywords, limit, offset, type) {
    return axios.get(`${base}/search?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`)
  },
  searchDefault () {
    return axios.get(`${base}/search/default`)
  },
  searchHotDetail () {
    return axios.get(`${base}/search/hot/detail`)
  },
  searchSuggestion (keywords) {
    return axios.get(`${base}/search/suggest?keywords=${keywords}&type=mobile`)
  },
  searchSuggest (keywords) {
    return axios.get(`${base}/search/multimatch?keywords=${keywords}`)
  }
}

// 电台有关
const radios = {
  detail (rid) {
    return axios.get(`${base}/dj/detail?rid=${rid}`)
  },
  program (rid, limit, offset, asc) {
    return axios.get(`${base}/dj/program?rid=${rid}&limit=${limit}&offset=${offset}&asc=${asc}`)
  },
  subs (rid, t) {
    return axios.get(`${base}/dj/sub?rid=${rid}&t=${t}`)
  },
  comments (id, offset = 0, limit = 20) {
    return axios.get(`${base}/comment/dj?id=${id}&offset=${offset}&limit=${limit}`)
  }
}

// 歌曲播放有关
const playmusic = {
  lyric (id) {
    return axios.get(`${base}/lyric?id=${id}`)
  },
  url (id) {
    return axios.get(`${base}/song/url?id=${id}`)
  },
  check (id) {
    return axios.get(`${base}/check/music?id=${id}`)
  },
  comments (id, offset = 0, limit = 20) {
    return axios.get(`${base}/comment/dj?id=${id}&offset=${offset}&limit=${limit}`)
  }
}

export default {
  login,
  find,
  video,
  users,
  playlists,
  likes,
  subs,
  songLists,
  commentFeature,
  singers,
  searchs,
  musics,
  albums,
  radios,
  playmusic
}
