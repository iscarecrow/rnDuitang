import * as types from '../constants/ActionTypes';

const initialState = {
  title:"每日精选"
};

export default function navigatorData(state = initialState, action) {
  switch (action.type) {
    case types.NAVIGATOR_TITLE:
      return  Object.assign({}, state, {
        title:action.title
      });
    default:
      return state;
  }
}