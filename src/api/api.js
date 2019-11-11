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

export default {
  login,
  find
}
