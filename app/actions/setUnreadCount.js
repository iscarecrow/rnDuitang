import * as types from '../constants/ActionTypes';

export function setUnreadCount(json) {
  return {
    type: types.SET_UNREAD_COUNT,
    data: json.data
  };
}