'use strict';

import React, { PropTypes, Component } from 'react';

import DtTimeTransform from '../part/DtTimeTransform';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';


let styles = StyleSheet.create({
  container: {
    height:24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(234,235,236,1)',
  },
  title: {
    color:'rgba(102,102,102,1)',
    fontSize: 13,
  }

});

export default class IndexTime extends React.Component {
  render () {

    const { data } = this.props;

    let time = DtTimeTransform(data);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{time}</Text>
      </View>
    )
  } 
}