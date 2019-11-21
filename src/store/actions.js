import * as types from './mutations-types'

export const token = function ({commit,state},{token}) {
  commit(types.SET_TOKEN,token);
};
export const loginState = function ({commit,state},{loginState}) {
  commit(types.SET_LOGIN,loginState);

};
//视频播放有关
export const video = function ({commit,state},{vid,index,videoList}) {
  commit(types.SET_CURRENT_VID,vid);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_VIDEO_LIST,videoList);//视频列表流 前后播放的视频进度
};
//评论上拉加载有关
export const comment = function ({commit,state},{limit,hotLimit}) {
  commit(types.SET_LIMIT,limit);
  commit(types.SET_HOT_LIMIT,hotLimit);
};
//评论是否提前展示
export const commentBack = function ({commit,state},{back}) {
  commit(types.SET_BACK,back);
};
export const setCurrentTimes = function ({commit, state},{videoCurrentTime}) {
  // let currentTimes = state.videoCurrentTime.slice();
  let currentTimes = state.videoList.slice();
  // this.videoCurrentTime = currentTimes.push(videoCurrentTime);

  commit(types.SET_VIDEO_CURRENT_TIME,videoCurrentTime);
};
