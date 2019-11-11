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
   async list() {
     return await axios.get(`${base}/video/group/list`)
   },
   //获取视频标签下的视频
   async videolist() {
     return await axios.get(`${base}/video/group?id=9102`)
   },
   //相关视频
   async allvideo() {
     return await axios.get(`${base}/related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D`)
   },
   //获取视频详情
   async video() {
     return await axios.get(`${base}/video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D`)
   },
   //获取视频播放地址
   // async video() {
   //   return await axios.get(`${base}/video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D`)
   // },
   //获取全部mv
   async allmvs() {
     return await axios.get(`${base}/mv/all`)
   },
 }

export default {
  login,
  find,
  video
}
