import * as types from '../constants/ActionTypes';

const initialState = {
  title:"我是发现页面"
};

export default function exploreData(state = initialState, action) {
  switch (action.type) {
    case types.EXPLORE_TEST_NAME:
      return  Object.assign({}, state, {
        title:action.title
      });
    default:
      return state;
  }
}