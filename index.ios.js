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
  View,
  AppState
} from 'react-native';

import { Provider } from 'react-redux';

import configureStore from './app/store/configureStore.prod';

import NavigatorBar from './app/containers/NavigatorBar';
import MainTab from './app/containers/MainTab';

const store = configureStore();

class MeApp extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    AppState.removeEventListener('memoryWarning', this._handleMemoryWarning);
  }
  _handleAppStateChange(currentAppState) {
    // 后台 inactive  background
    // 前台 active
    console.log(currentAppState);
  }
  _handleMemoryWarning() {
    console.log(this.state.memoryWarnings);
  }
  render() {
    return (
      <Provider store={store}>
        <MainTab/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('rnDuitang', () => MeApp);
