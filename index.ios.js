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

import Me from './app/containers/Me';

import MainTab from './app/containers/MainTab';

const store = configureStore();

class MeApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainTab/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('rnDuitang', () => MeApp);
