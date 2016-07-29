import * as types from '../constants/ActionTypes';

export function setExplore(title) {
  return {
    type: types.EXPLORE_TEST_NAME,
    title: title 
  };
}