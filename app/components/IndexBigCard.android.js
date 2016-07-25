'use strict';

import React from 'react-native';
import ViewPager from 'react-native-viewpager';
import Image from '../lib/Image';

let {
  StyleSheet,
  Text,
  View,
  Platform,
  ViewPagerAndroid,
  Alert,
  TouchableHighlight,
  TouchableNativeFeedback,
  Dimensions,
} = React;

import type ,{ ViewPagerScrollState } from 'ViewPagerAndroid';

let deviceWidth = Dimensions.get('window').width;

let pageHeight = Dimensions.get('window').width/1.8;

let styles = React.StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  viewPager: {
    height: pageHeight
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222222'
  },
  banner_height: {
    width: deviceWidth,
    height: pageHeight,
  },
  slide_bg_wrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  slide_bg: {
    flex:1,
    resizeMode: 'cover',
  },
  slide_mask:{
    flex:1,
    resizeMode: 'cover',
  },
  slide_container:{
    position: 'absolute',
    bottom:18,
    left:12,
  },
  slide_cnt_container:{
    flexDirection:'column',
    flex:1,
  },
  slide_title: {
    fontSize:20,
    color:'#fff',
    fontWeight:'bold',
    marginRight:63,
  },
  slide_cnt: {
    fontSize:13,
    lineHeight:18,
    color: '#fff',
    marginRight:70,
    marginTop:6,
  },
  slide_icon: {
    width: 30,
    height: 30,
    borderRadius:15,
    backgroundColor:'rgba(231,76,59,1)',
    position: 'absolute',
    right:18,
    bottom:18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide_num: {
    color:'#fff',
    backgroundColor:'rgba(231,76,59,0)',
    fontSize:12,
  }
});

export default class IndexBigCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index:1
    };
  }
  onPageSelected(e) {
    let index = e.nativeEvent.position + 1 || 1;
    this.setState({index:index})
  }
  onPageScroll(e) {
    // this.setState({progress: e.nativeEvent});
  }
  onPageScrollStateChanged(state : ViewPagerScrollState) {
    // alert(state)
    // this.setState({scrollState: state});
  }
  render () {
    const {data} = this.props;
    const total = data.length;
    const index = this.state.index;
    let pageIcons;
    if (total === 1) {
      pageIcons = null
    } else {
      pageIcons = <View style={styles.slide_icon}>
        <Text style={styles.slide_num}>
          {index}/{total}
        </Text>
      </View>
    }

    let pages = data.map((item,i) => 
      <View key={i} style={[styles.flex_1 ,styles.banner_height]} collapsable={false}>
        <View style={styles.slide_bg_wrapper}>
          <Image style={{flex:1,resizeMode: 'cover'}} source={{uri: item.image_url}} />
        </View>
        <View style={styles.slide_bg_wrapper}>
          <Image style={{flex:1,resizeMode: 'cover'}} source={require('../image/banner_cover.png')}/>
        </View>
        <View style={styles.slide_container}>
          <View style={styles.slide_cnt_container}>
            <Text style={styles.slide_title} numberOfLines={1}>{item.description}</Text>
            {item.stitle !=='' ? <Text style={styles.slide_cnt} numberOfLines={2}>{item.stitle}</Text> : null}
          </View>
        </View>
      </View>
    )
    return (
      <View style={styles.banner_height}> 
        <ViewPagerAndroid
          style={[styles.flex_1]}
          initialPage={0}
          onPageScroll = {this.onPageScroll}
          onPageSelected = {(e)=>this.onPageSelected(e)}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          keyboardDismissMode={'on-drag'}
          ref={viewPager => {this.viewPager = viewPager;}}>
          {pages}
        </ViewPagerAndroid> 
        {pageIcons}
      </View>
    )
  }
}