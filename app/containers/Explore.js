import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import NavMe from './NavMe';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  _handleNextPress(nextRoute) {
    // this.props.navigator.push(nextRoute);
    console.log(this.props);
  }
  render() {
    const nextRoute = {
      title: "我",
      component: NavMe,
      rightButtonTitle: 'Cancel',
      onRightButtonPress: () => { this.refs.nav.navigator.pop(); }
    };
    return (
      <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)}>
        <Text style={{marginTop: 200, alignSelf: 'center'}}>
          点击去我的页面 {this.props.myProp}!
        </Text>
      </TouchableHighlight>
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

export default Explore;