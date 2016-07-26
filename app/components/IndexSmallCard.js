'use strict';

import React, { PropTypes, Component } from 'react';
import iosSwiper from 'react-native-swiper';
// import Image from '../lib/Image';
import URLRouter from '../lib/URLRouter';

import {
  Text,
  View,
  PixelRatio,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

let styles = React.StyleSheet.create({
  item_container: {
    flexDirection: 'column',
    flex:1,
  },
  item: {
    height: 100,
    margin: 12,
    flexDirection:'row',
  },
  item_line: {
    backgroundColor: 'rgba(0 , 0, 0, 0.16)',
    height: 1/PixelRatio.get(),
    marginRight: 12,
    marginLeft: 12,
  },
  item_l: {
    height: 124,
  },
  item_image:{
    width: 100,
    height: 100,
    marginRight: 10,
  },
  item_r: {
    flex:1,
  },
  item_title: {
    fontSize: 17,
    color: 'rgba(51,51,51,1)',
    lineHeight: 24,
  },
  item_cnt: {
    fontSize: 13,
    color: 'rgba(102, 102, 102,1)',
    lineHeight: 18,
  },
  item_btn: {
    position: 'absolute',
    bottom:0,
    flexDirection:'row'
  },
  item_icon:{
    height:17,
    width:17,
    marginRight:5,
  },
  item_read: {
    flex:1,
    fontSize: 12,
    color: 'rgba(153,153,153,1)',
  },
  
});

export default class IndexSmallCard extends React.Component {
  _onPressButton (url) {
    URLRouter.handle(url);
  }
  componentDidMount () {
  
  }
  render () {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    const {data} = this.props;
    let items = data.map((item,i) =>
      <View key={i}>
        <TouchableElement onPress={()=>this._onPressButton(item.target)} underlayColor="transparent">
          <View style={styles.item}>
            <View style={styles.item_l}>
              <Image style={styles.item_image} source={{uri: item.image_url}} />
            </View>
            <View style={styles.item_r}>
              {item.stitle !== '' ? <Text style={styles.item_title} numberOfLines={1}>{item.description}</Text>: <Text style={styles.item_title} numberOfLines={2}>{item.description}</Text>}
              <Text style={styles.item_cnt} numberOfLines={2}>{item.stitle}</Text>
              <View style={styles.item_btn}>
                <Image style={styles.item_icon} source={require('../image/icon_album.png')}/>
                <Text style={styles.item_read}>{item.dynamic_info}</Text>
              </View>
            </View>
          </View>
        </TouchableElement>
        <View style={styles.item_line}></View>
      </View>
    );
    return (
      <View style={styles.item_container}>
        {items}
      </View>
    )
  } 
}