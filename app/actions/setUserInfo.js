import * as types from '../constants/ActionTypes';
/**
 * [setUserInfo description] 设置用户信息，情景 主动设置，广播设置等
 * @param       {[type]}                 json [description]
 * @description
 * @author      hugin<hxjlucky@gmail.com> 
 * @updateTime  2016-07-22T11:51:52+0800
 */
export function setUserInfo(json) {
  return {
    type: types.SET_USER_INFO,
    data: json
  };
}