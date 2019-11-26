const state = {
  token: '', // 网站token
  loginState: false,
  currentVid: '',
  limit: 20,
  hotLimit: 20,
  back: false, // 页面评论页是否提前展示
  videoList: [], // 保存前后视频列表播放进度
  currentIndex: -1,
  videoCurrentTime: [], // 保存前后两个视频的播放时间
  currentUrl: '', // 当前的播放地址
  uid: 477726475// 用户Id信息
}
export default state
