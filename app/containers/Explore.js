import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import Button from 'react-native-button';

import * as PageNameTypes from '../constants/PageNameTypes';

import InventoryDetail from './InventoryDetail';


class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder'
    }
  }
  componentDidMount() {
    const {exploreData} = this.props;
  }
  _handlePress(name) {
    switch (name) {
      case name = PageNameTypes.inventoryDetail:
        const nextRoute = {
          component: InventoryDetail,
          title: '商品详情'
        };
        this.props.navigator.push(nextRoute);
        console.log(this); 
        console.log('Pressed!');
        break;

    }


    
  }
  render() {
   let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
      <ScrollView>
         <Button
          style={{fontSize: 16, color: '#333',paddingTop:12,paddingBottom:12}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress(PageNameTypes.inventoryDetail)}>
          商品详情页面
        </Button>
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
  return {
    exploreData: state.exploreData,
  };
}


var styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

export default connect(mapStateToProps)(Explore);
