import { REQUEST_ORDER_COUNT, RECEIVE_ORDER_COUNT } from '../constants/ActionTypes';

const initialState = {};

export default function orderCountData(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ORDER_COUNT:
      return Object.assign({}, state, {
        isLoading: 0,
      });
    case RECEIVE_ORDER_COUNT:
      console.log('111');
      return  Object.assign({}, state, {
        isLoading: 0
      });
    default:
      return state;
  }
}