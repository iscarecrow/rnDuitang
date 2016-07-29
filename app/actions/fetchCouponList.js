import DtFetch from  '../common/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';
// mock data
import couponListUnUseData from '../mock/couponListUnUseData';
import couponListPassData from '../mock/couponListPassData';

function requestCouponList() {
  return {
    type: types.REQUEST_COUPON_LIST,
  };
}

function receiveCouponList(json,coupon_status) {
  return {
    type: types.RECEIVE_COUPON_LIST,
    receivedAt: Date.now(),
    data: json.data,
    couponStatus:coupon_status
  };
}

function fetchCouponListData(data) {
  let json;
  let coupon_status = data.coupon_status || 1;
  if (coupon_status === 1) {
    json = couponListUnUseData;
  } else if (coupon_status === 2) {
    json = [];
  } else if (coupon_status === 4) {
    json = couponListPassData;
  }

  return dispatch => {
    dispatch(requestCouponList());
    dispatch(receiveCouponList(json,coupon_status));
    // return DtFetch({
    //     url: orderListApi,
    //     type: "GET"
    //   })
    //   .then(json => dispatch(receiveCouponList(json)));    
  }
}

export function selectCouponStatus(coupon_status) {
  return {
    type: types.SELECT_COUPON_STATUS,
    couponStatus: coupon_status
  }
}

export function fetchCouponList(data) {
  return (dispatch) => dispatch(fetchCouponListData(data));
}