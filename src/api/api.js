import axios from './http';
const base = 'http://localhost:3000'; //定义默认基准地址

//登录有关
export const login = {
  login() {
    return axios.get(`${base}/`)
  }
};

//find页面
export const find = {
  //轮播图
  slide() {
    return axios.get(`${base}/banner?type=2`);
  }
};
