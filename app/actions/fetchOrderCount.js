import DtFetch from  '../common/dtFetch';
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
    receivedAt: Date.now(),
    data: json.data
  };
}

function fetchOrderCountData() {
  let orderListApi = `${api.orderListCount}?order_status=to_be_paid,to_be_delivered,to_be_received`;

  return dispatch => {
    dispatch(requestOrderCount());
    return DtFetch({
        url: orderListApi,
        type: "GET"
      })
      .then(json => dispatch(receiveOrderCount(json)));    
  }
}

export function fetchOrderCount() {
  return (dispatch) => dispatch(fetchOrderCountData());
}