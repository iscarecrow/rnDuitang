/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';

import configureStore from './app/store/configureStore.prod';

// import MainTab from './app/containers/MainTab';

import Navigator from './app/containers/Navigator';


const store = configureStore();

class MeApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('rnDuitang', () => MeApp);
