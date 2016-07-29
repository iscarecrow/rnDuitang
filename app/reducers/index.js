import { combineReducers } from 'redux';
import orderCountData from './orderCount';
import unreadCountData from './unreadCount';
import userInfoData from './userInfo';
import navigatorData from './navigator';
import mainTabData from './mainTab';
import couponListData from './couponList';
import exploreData from './explore';


const rootReducer = combineReducers({
  orderCountData,
  unreadCountData,
  userInfoData,
  navigatorData,
  mainTabData,
  couponListData,
  exploreData
});

export default rootReducer;