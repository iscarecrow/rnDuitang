import * as types from '../constants/ActionTypes';

const initialState = {
  selectedTabName:"home"
};

export default function mainTabData(state = initialState, action) {
  switch (action.type) {
    case types.MAIN_TAB_SELECT:
      return  Object.assign({}, state, {
        selectedTabName:action.selectedTabName
      });
    default:
      return state;
  }
}