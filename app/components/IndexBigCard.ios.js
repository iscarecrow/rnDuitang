'use strict';

import React from 'react-native';
import Swiper from 'react-native-swiper';
import Image from '../lib/Image';
// import URLRouter from '../lib/URLRouter';

let {
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
} = React;

let styles = React.StyleSheet.create({
  wrapper: {

  },
  slide: {
    flex:1,
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

let renderPagination = function (index, total, context) {
  console.log(context);
  return (
    <View style={styles.slide_icon}>
      <Text style={styles.slide_num}>
        {index + 1}/{total}
      </Text>
    </View>
  )
}

export default class IndexBigCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onPressButton (url) {
    console.log('aaa');
    URLRouter.handle(url);
  }
  _onTouchStart (e, state, context) {
    console.log(e);
  }
  _onTouchEnd (e, state, context) {
    // console.log(e);
  }
  _onMomentumScrollEnd (e, state, context) {
    // console.log(e);
  }
  render () {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    const {data} = this.props;
    console.log(data);
    let items = data.map((item,i) =>
      <View style={styles.slide} key={i}>
          <View style={styles.slide_bg_wrapper}>
            <Image style={styles.slide_bg} source={{uri: item.image_url}} />
          </View>
          <View style={styles.slide_bg_wrapper}>
            <Image style={styles.slide_mask} source={require('../image/banner_cover.png')}/>
          </View>
          <View style={styles.slide_container}>
            <View style={styles.slide_cnt_container}>
              <Text style={styles.slide_title} numberOfLines={1}>{item.description}</Text>
              {item.stitle !=='' ? <Text style={styles.slide_cnt} numberOfLines={2}>{item.stitle}</Text> : null}
            </View>
          </View>
      </View>
    );
    return (
      <View>
        <Swiper style={styles.wrapper} height={Dimensions.get('window').width/1.8} renderPagination={renderPagination} 
          autoplay={false}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          paginationStyle={{
            bottom: -23,left: null, right: 10,
          }} 
          bounces={true}
        >
          {items}
        </Swiper>
      </View>
    )
  } 
}