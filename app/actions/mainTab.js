import * as types from '../constants/ActionTypes';

export function setTab(selectedTabName) {
  return {
    type: types.MAIN_TAB_SELECT,
    selectedTabName: selectedTabName
  };
}