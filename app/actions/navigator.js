import * as types from '../constants/ActionTypes';

export function setNavigator(title) {
  return {
    type: types.NAVIGATOR_TITLE,
    title: title
  };
}