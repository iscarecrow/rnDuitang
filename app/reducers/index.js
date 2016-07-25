import { combineReducers } from 'redux';
import orderCountData from './orderCount';
import unreadCountData from './unreadCount';
import userInfoData from './userInfo';

const rootReducer = combineReducers({
  orderCountData,
  unreadCountData,
  userInfoData,
});

export default rootReducer;