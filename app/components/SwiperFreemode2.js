'use strict';

import React , { Component, PropTypes } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';

const window = Dimensions.get('window');

let styles = StyleSheet.create({
  contains: {
    flexDirection: 'row',
  },
  slide: {
    marginLeft:12
  }
});

const imageArray = [
  "http://img4q.duitang.com/uploads/people/201510/14/20151014173005_FS8XT.thumb.200_200_c.png",
  "http://img4q.duitang.com/uploads/people/201511/13/20151113152057_UGfiL.thumb.200_200_c.jpeg",
  "http://img4q.duitang.com/uploads/people/201508/20/20150820173150_CMRsc.thumb.200_200_c.jpeg",
  "http://img4q.duitang.com/uploads/people/201510/12/20151012111124_58ayV.thumb.200_200_c.png",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150241_MREKj.thumb.200_200_c.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150241_BYMwV.thumb.200_200_c.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150241_CvRcQ.thumb.200_200_c.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150242_kBhsX.thumb.200_200_c.jpeg",
  "http://img4q.duitang.com/uploads/item/201604/05/20160405150242_LXMEh.thumb.200_200_c.jpeg",
]

/**
 * swiper滑动，小图多余屏幕
 */
export default class SwiperFreemode2 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render () {
    const items = imageArray.map((item,i) => 
      <View key={i} style={styles.slide}>
        <Image style={{width:90,height:90}} source={{uri:item}}/>
        <Text style={{fontSize:11,textAlign:'left',width:90,paddingTop:12}}>Beauty Buffet Q10牛奶面膜 100ml</Text>
        <Text style={{marginTop:10,fontSize:11,textAlign:'left',color:'#ff5959'}}>¥59</Text>
      </View>
    );
    return (
      <View style={{...this.props.style,justifyContent: 'center'}}>
        <ScrollView
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}>
          {items}
        </ScrollView>
      </View>
    )
  }
}

