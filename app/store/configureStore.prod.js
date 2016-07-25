import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {
  const rootReducer = combineReducers({
     
  });

  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}