import * as types from './mutations-types'

export const token = function ({commit,state},{token}) {
  commit(types.SET_TOKEN,token);
};
export const loginState = function ({commit,state},{loginState}) {
  commit(types.SET_LOGIN,loginState);

};
