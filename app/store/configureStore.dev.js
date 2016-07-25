import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(thunkMiddleware,loggerMiddleware),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}