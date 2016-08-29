import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import ModalBox from '../plugin/ModalBox';
import SwiperBannerNum from '../components/SwiperBannerNum';
import InventoryDetailBuy from '../components/InventoryDetailBuy';
import SwiperFreemode2 from '../components/SwiperFreemode2';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ListView,
  PixelRatio,
  Dimensions,
  Animated,
  Easing,
  Image
} from 'react-native';

const window = Dimensions.get('window');

let styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flexContainer: {
    flexDirection:'row',
  },
  line: {
    height:1/PixelRatio.get(),
    backgroundColor:'rgba(0,0,0,0.18)',
  }
});


export default class InventoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  }
  shareView() {
    alert('分享,咨询客户端');
  }
  closeBuyModal() {
    this.setState({isOpen: false});
  }
  openBuyModal() {
    this.setState({isOpen: true});
  }
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.flex_1}>
          {/* 滑动区域 */}
          <SwiperBannerNum/>
          {/* 商品基本介绍 */}
          <View style={{height:175,backgroundColor:'green',justifyContent: 'center'}}>
            <Text style={{color:'#fff',fontSize:30,textAlign:'center'}}>商品基本介绍</Text>
          </View>
          <View style={{justifyContent: 'center',paddingBottom:22}}>
            <Text style={{paddingTop:16,paddingBottom:16,fontSize:17,textAlign:'center',color:'#444'}}>你可能还喜欢</Text>
            <View style={[styles.line,{marginLeft:12}]}></View>
            <View style={{height:12}}></View>
            <SwiperFreemode2/>
          </View>
          {/* 保证 */}
          <View style={{height:1175,backgroundColor:'yellow',justifyContent: 'center'}}>
            <Text style={{color:'#fff',fontSize:30,textAlign:'center',}}>保证</Text>
          </View>
          {/* 评论区域 */}
          {/* 你可能还喜欢 */} 
          {/* 图文详情 */}
          <View style={styles.flex_1}>
            <Image style={{flex:1,resizeMode:'contain',height:500}} source={{uri:'http://img4q.duitang.com/uploads/item/201603/21/20160321135314_sUYFk.thumb.600_0.jpeg'}}/>
          </View>
        </ScrollView>
        <View style={styles.line}></View>
        <InventoryDetailBuy isOpen={this.state.isOpen} callbackParent={()=>this.openBuyModal()}/>
      </View>
    );
  }
}

InventoryDetail.propTypes = {
  
}


// <ModalBox ref={'buyModal'} isOpen={this.state.isOpen} style={{justifyContent: 'center',alignItems: 'center',height:375}} onClosed={()=>this.closeBuyModal()} position={"bottom"}>
//           <View>
//             <Text>ddddddddd</Text>
//           </View>
//         </ModalBox>
