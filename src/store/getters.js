//映射state的数据，通常会用getters作一层包装。也就是从getter里面去取数据到组件中
//getters 是用来获取 Vuex 数据用的，在组件里通过 mapGetters，就可以访问到 getters 对应的数据了。
export const token = state => state.token;
export const loginState = state => state.loginState;
export const currentVid = state => state.currentVid;
export const limit = state => state.limit;
export const hotLimit = state => state.hotLimit;
export const back = state => state.back;
export const videoList = state => state.videoList;
export const videoCurrentTime = state => state.videoCurrentTime;
export const currentIndex = state => state.currentIndex;
export const currentVideo = (state) => {
  return state.videoList[state.currentIndex] || {}
};
export const currentUrl = state => state.currentUrl;
export const uid = state => state.uid;


