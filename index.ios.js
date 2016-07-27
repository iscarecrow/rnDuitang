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

import NavigatorBar from './app/containers/NavigatorBar';
import MainTab from './app/containers/MainTab';

// import NavigatorIOSApp from './app/testcomponents/NavigatorIOSApp';

const store = configureStore();

// class MeApp extends Component {
//   render() {
//     return (
//       <NavigatorIOSApp/>
//     )
//   }
// }

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
