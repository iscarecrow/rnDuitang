import { combineReducers } from 'redux';
import { orderCountData } from './orderCount';

const rootReducer = combineReducers({
  orderCountData:orderCountData
});

export default rootReducer;