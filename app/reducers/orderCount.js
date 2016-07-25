import * as types from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  waitReceiveCount: 0,
  waitSendCount: 0,
  waitPayCount: 0,
  waitReceiveCountText:'',
  waitSendCountText: '',
  waitPayCountText: ''
};
/**
 * [orderCountData description] 我的订单 对应的待付款、待发货、待收货 数据
 * @param       {[type]}                 state  [description]
 * @param       {[type]}                 action [description]
 * @return      {[type]}                        [description]
 * @description
 * @author      hugin<hxjlucky@gmail.com> 
 * @updateTime  2016-07-21T18:48:51+0800
 */
export default function orderCountData(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_ORDER_COUNT:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case types.RECEIVE_ORDER_COUNT:
      let to_be_received = action.data.to_be_received || 0;
      let to_be_delivered =  action.data.to_be_delivered || 0;
      let to_be_paid = action.data.to_be_paid || 0;

      let to_be_delivered_text = to_be_delivered;
      let to_be_received_text  = to_be_received ;
      let to_be_paid_text = to_be_paid;

      if (to_be_delivered > 99) {
        to_be_delivered_text ='99+';
      }
      if (to_be_received > 99) {
        to_be_received_text = '99+';
      }
      if (to_be_paid > 99) {
        to_be_paid_text = '99+';
      }
      return  Object.assign({}, state, {
        isLoading: false,
        waitReceiveCount: to_be_received,
        waitSendCount: to_be_delivered,
        waitPayCount: to_be_paid,
        waitReceiveCountText: to_be_received_text,
        waitSendCountText: to_be_delivered_text,
        waitPayCountText: to_be_paid_text     
      });
    default:
      return state;
  }
}