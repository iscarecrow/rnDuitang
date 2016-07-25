import * as types from '../constants/ActionTypes';
import DtTools from '../common/dtTools';
/**
 * [initialState description] 此处User信息不全，只初始化需要使用的信息，userService里有更多的信息
 * @type {Object}
 */
const initialState = {
  id: "",
  username: "",
  avatar: "",
  identity:[],
  isDaren:false,
  shortDescription:"",
};

export default function userInfoData(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_INFO:
      let reg = /_certify/ig;
      let identity = action.data.identity || [];
      let isDaren = identity.some(item => reg.test(item) == true);
      action.data.avatar = DtTools.dtImageTrans(action.data.avatar, true, 100, 100, 'c');

      return  Object.assign({}, state, {
        id: action.data.id,
        username: action.data.username,
        avatar:action.data.avatar,
        identity: identity,
        isDaren:isDaren,
        shortDescription:action.data.short_description    
      });
    default:
      return state;
  }
}