import React, { Component, PropTypes } from 'react';
import Button from 'react-native-button';

import {
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Image
} from 'react-native';

let styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex_container: {
    flexDirection:'row',
  },
  inventory_detail_buy_container: {
    // height:49,
    backgroundColor:'#fff'
  },
  inventory_detail_buy_container_l: {
    flex:1,
    borderRightColor: 'rgba(0,0,0,0.18)',
    borderRightWidth: 1/PixelRatio.get()
  },
  inventory_detail_buy_container_m: {
    flex:2.93,
    justifyContent: 'center',
  },
  inventory_detail_buy_container_r: {
    flex:2.93,
    justifyContent: 'center',
    // backgroundColor: 'rgb(255,89,89)'
  },
  line: {
    height:1/PixelRatio.get(),
    backgroundColor:'rgba(0,0,0,0.18)',
  }
});

/**
 * 底部购买组件
 */
export default class InventoryDetailBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props 
    }
  }
  openBuyModal() {
    this.props.callbackParent();
  }
  joinCart() {
    console.log('加入购物车');
  }
  render() {
    return (
      <View>
        <View style={[styles.inventory_detail_buy_container,styles.flex_container]}>
          <View style={styles.inventory_detail_buy_container_l}>
            <Image style={{marginLeft:12,marginTop:10,height:30, width:30}} source={require('../image/icon_cart/icon_cart.png')}/>
          </View>
          <View style={styles.inventory_detail_buy_container_m}>
            <Button
              containerStyle={{paddingTop:17,paddingBottom:17,backgroundColor:'#fff'}}
              style={{fontSize: 15, color: 'rgb(68,68,68)'}}
              onPress={() => this.joinCart()}>
              加入购物车
            </Button>
          </View>
          <View style={styles.inventory_detail_buy_container_r}>
            <Button
              containerStyle={{paddingTop:17,paddingBottom:17,backgroundColor:'rgb(255,89,89)'}}
              activeOpacity={1}
              style={{fontSize: 15, color: '#fff'}}
              onPress={() => this.openBuyModal()}>
              立即购买
            </Button>
          </View>
        </View>
      </View>
    );
  }
}