import DtFetch from  '../common/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock data
import couponListData from '../mock/couponListData';

function requestCouponList() {
  return {
    type: types.REQUEST_COUPON_LIST,
  };
}

function receiveCouponList(json) {
  return {
    type: types.RECEIVE_COUPON_LIST,
    receivedAt: Date.now(),
    data: json.data
  };
}

function fetchCouponListData() {

  let json = couponListData;
  return dispatch => {
    dispatch(requestCouponList());
    dispatch(receiveCouponList(json));
    // return DtFetch({
    //     url: orderListApi,
    //     type: "GET"
    //   })
    //   .then(json => dispatch(receiveCouponList(json)));    
  }
}

export function fetchCouponList() {
  return (dispatch) => dispatch(fetchCouponListData());
}