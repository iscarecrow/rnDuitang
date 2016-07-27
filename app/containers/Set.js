import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet
} from 'react-native';

class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  componentDidMount() {
    console.log(this.props);     
  }
  render() {
    return (
      <Text style={{marginTop: 200, alignSelf: 'center'}}>
          设置页面
      </Text>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

export default Set;