import * as types from '../constants/ActionTypes';

const initialState = {
  isLoadingMore: false,
  dataSource: [],
  limit:5,
  start:0,
  couponStatus:1,
  unUseList:{
    start:0,
    isLoadingMore: false,
    dataSource: []
  },
  useList: {
    start:0,
    isLoadingMore: false,
    dataSource: []

  },
  passList: {
    start:0,
    isLoadingMore: false,
    dataSource: []
  },
};

let cache = [];
let start = 0;
let cacheUnUse = [];
let cacheUse = [];
let cachePass = [];
let startUnUse = 0;
let startUse = 0;
let startPass = 0;
let curStatus= 1;

export default function couponListData(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_COUPON_STATUS:
      console.log(action.couponStatus);
      return Object.assign({}, state, {
        dataSource: cache,
        curStatus : action.couponStatus,
      });
    case types.REQUEST_COUPON_LIST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case types.RECEIVE_COUPON_LIST: 
      if (action.couponStatus === 1) {
        action.data.object_list.map(elem=> {
          cacheUnUse.push(elem);
        });
        startUnUse = action.data.next_start;
        cache = cacheUnUse;
        start = startUnUse;
        curStatus = 1;
      } else if (action.couponStatus === 2) {
        curStatus = 2;
      } else if (action.couponStatus === 4) {
        action.data.object_list.map(elem=> {
          cachePass.push(elem);
        });
        cache = cachePass;
        curStatus = 4;
      }
      console.log(cache);
      return  Object.assign({}, state, {
        isLoadingMore: action.data.more,
        dataSource: cache,
        curStatus : curStatus,
        start:action.data.next_start, 
      });
    default:
      return state;
  }
}