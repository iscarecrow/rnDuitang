import * as types from '../constants/ActionTypes';

const initialState = {
  isLoadingMore: false,
  dataSource: [],
  limit:5,
  start:0,
};

let cache =[];

export default function couponListData(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_COUPON_LIST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case types.RECEIVE_COUPON_LIST:
      action.data.object_list.map(elem=> {
        cache.push(elem);
      });
      console.log(cache.length);
      return  Object.assign({}, state, {
        isLoadingMore: action.data.more,
        dataSource: cache,
        start:action.data.next_start
      });
    default:
      return state;
  }
}