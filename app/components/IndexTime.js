'use strict';

import React from 'react-native';

import DtTimeTransform from '../part/DtTimeTransform';

let {
  Text,
  View,
} = React;

let styles = React.StyleSheet.create({
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