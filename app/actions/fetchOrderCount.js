// import DtFetch from  '../comm/dtFetch';
import * as types from '../constants/ActionTypes';
import * as api from '../constants/ApiServer';

function requestOrderCount() {
  return {
    type: types.REQUEST_ORDER_COUNT,
  };
}

function receiveOrderCount(json) {
  return {
    type: types.RECEIVE_ORDER_COUNT,
    receivedAt: Date.now()
  };
}

function fetchOrderCountData() {
  return dispatch => {
    dispatch(requestOrderCount());
    // return DtFetch({
    //     url: api.OrderCountUri,
    //     type: "GET"
    //   })
    //   .then(json => dispatch(receiveOrderCount(json)));
  };
}

export function fetchOrderCount() {
  return (dispatch) => dispatch(fetchOrderCountData());
}