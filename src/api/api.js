import axios from './http';
const base = 'http://localhost:3000'; //定义默认基准地址

//登录有关
 const login = {
  login() {
    return axios.get(`${base}/`)
  }
};

//find页面
 const find = {
  //轮播图
  async slide() {
    return await axios.get(`${base}/banner?type=2`);
  },
  //推荐歌曲
   async recommend() {
     return await axios.get(`${base}/personalized?limit=6`);
   }
};

//视频相关
 const video = {
   //获取视频标签列表
   async videoGroupLists() {
     return await axios.get(`${base}/video/group/list`)
   },
   //获取视频标签下的视频
   async videolist(id=9102) {
     return await axios.get(`${base}/video/group?id=${id}`)
   },
   //相关视频
   async allvideo(vid) {
     return await axios.get(`${base}/related/allvideo?id=${vid}`)
   },
   //获取视频详情
   async video(vid) {
     return await axios.get(`${base}/video/detail?id=${vid}`)
   },
   //获取视频播放地址
   async videourl(vid) {
     return await axios.get(`${base}/video/url?id=${vid}`)
   },
   //获取视频精彩评论
   async hotcomment(vid,limit=20) {
     return await axios.get(`${base}/comment/hot?id=${vid}&type=5&limit=${limit}`)
   },
   //获取视频最新评论
   async newcomment(vid,limit=20) {
     return await axios.get(`${base}/comment/video?id=${vid}&limit=${limit}`)
   },
   //获取全部mv
   async allmvs() {
     return await axios.get(`${base}/mv/all`)
   },
 };

 //用户有关
const users = {
  //刷新登录
  async refresh() {
    return await axios.get(`${base}/login/refresh`)
  },
  //退出登录
  async logout() {
    return await axios.get(`${base}/logout`)
  },
  //登录状态
  async status() {
    return await axios.get(`${base}/login/status`)
  },
  //手机登录
  async cellphone(phonenumber,password) {
    return await axios.get(`${base}/login/cellphone?phone=${phonenumber}&password=${password}`)
  },

  //发送验证码
  async sendCode(phonenumber) {
    return await axios.get(`${base}/captcha/sent?phone=${phonenumber}`)
  },
  //验证验证码
  async verifyCode(phonenumber,code) {
    return await axios.get(`${base}/captcha/verify?phone=${phonenumber}&captcha=${code}`)
  },
  //注册(修改密码)
  async register(phonenumber,password,code,nickname) {
    return await axios.get(`${base}/register/cellphone?phone=${phonenumber}&password=${password}&captcha=${code}&nickname=${nickname}`)
  },
  //检测手机号码是否已注册
  async existence(phonenumber) {
    return await axios.get(`${base}/cellphone/existence/check?phone=${phonenumber}`)
  },
  //初始化昵称
  async nickname(nickname) {
    return await axios.get(`${base}/activate/init/profile?nickname=${nickname}`)
  },
  //更换绑定手机
  async rebind(phonenumber,oldcode,newcode) {
    return await axios.get(`${base}/rebind?phone=${phonenumber}&oldcaptcha=${oldcode}&captcha=${newcode}`)
  },


  //获取用户详情
  async userdetail(uid) {
    return await axios.get(`${base}/user/detail?uid=${uid}`)
  },
  //获取用户信息 , 歌单，收藏，mv, dj 数量
  async usermsg() {
    return await axios.get(`${base}/user/subcount`)
  },
  //更新用户信息

  //获取用户歌单
  async playlist(uid) {
    return await axios.get(`${base}/user/playlist?uid=${uid}`)
  },
};

export default {
  login,
  find,
  video,
  users,
}
