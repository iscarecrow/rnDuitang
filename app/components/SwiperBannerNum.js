'use strict';

import React , { Component, PropTypes } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';

const window = Dimensions.get('window');

let styles = StyleSheet.create({
  wrapper: {

  },
  contains: {
    flexDirection: 'row',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination_cnt: {
    flexDirection: 'row',position:'absolute',bottom:12,right:12,backgroundColor:'rgba(0,0,0,.15)',width:32,height:18,borderRadius:4,justifyContent: 'center',alignItems: 'center'
  }
});

const imageArray = [
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150241_MREKj.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150241_BYMwV.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150241_CvRcQ.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150242_kBhsX.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150242_LXMEh.jpeg"
]

/**
 * swiper滑动，样式右下侧数字轮换
 */
export default class SwiperBannerNum extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  _renderPagination(index, total, context) {
    return (
      <View style={styles.pagination_cnt}>
        <Text style={{fontSize:12,color:'#fff',textAlign:'center'}}>{index+1}/{total}</Text>
      </View>
    );
  }
  render () {
    const items = imageArray.map((item,i) => 
      <View key={i} style={styles.slide}>
        <Image height={window.width} width={window.width} source={{uri:item}}/>
      </View>
    );

    return (
      <Swiper 
        style={styles.wrapper}
        showsPagination={true}
        height={window.width} 
        showsButtons={false}
        renderPagination={this._renderPagination}
        loop={false}>
        {items}
      </Swiper>
    )
  }
}