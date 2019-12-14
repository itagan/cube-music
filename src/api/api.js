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
  // 获取用户歌单
  playlist (uid) {
    return axios.get(`${base}/user/playlist?uid=${uid}`)
  }
}

// 歌单有关
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
//收藏功能
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
  },
}
//歌单有关
const songLists = {
  songList (id = 2410346874) {
    return axios.get(`${base}/playlist/detail?id=${id}`)
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
  songLists
}
