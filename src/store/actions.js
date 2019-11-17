import * as types from './mutations-types'

export const token = function ({commit,state},{token}) {
  commit(types.SET_TOKEN,token);
};
export const loginState = function ({commit,state},{loginState}) {
  commit(types.SET_LOGIN,loginState);

};
//视频播放有关
export const video = function ({commit,state},{vid}) {
  commit(types.SET_CURRENT_VID,vid);
};
//评论上拉加载有关
export const comment = function ({commit,state},{limit,hotLimit}) {
  commit(types.SET_LIMIT,limit);
  commit(types.SET_HOT_LIMIT,hotLimit);
};
