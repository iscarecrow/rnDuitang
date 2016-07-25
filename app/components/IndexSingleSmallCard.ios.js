'use strict';

import React from 'react-native';
import Image from '../lib/Image';
import URLRouter from '../lib/URLRouter';

let {
  Text,
  View,
  PixelRatio,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
} = React;

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
  item_image:{
    width: 100,
    height: 100,
    marginRight: 10,
  },
  item_r: {
    flex:1,
  },
  item_title: {
    fontSize: 15,
    color: 'rgba(51,51,51,1)',
    lineHeight: 24,
  },
  item_cnt: {
    fontSize: 13,
    color: 'rgba(102, 102, 102,1)',
    lineHeight: 18,
    marginTop:2,
  },
  item_btn: {
    position: 'absolute',
    bottom:0,
    flexDirection:'row',
  },
  item_icon:{
    height:18,
    width:18,
    marginRight:5,
  },
  item_read: {
    flex:1,
    fontSize: 12,
    color: 'rgba(153,153,153,1)',
    height:18,
    lineHeight:16,
  },
  
});

export default class IndexSmallCard extends React.Component {
  _onPressButton (url) {
    URLRouter.handle(url);
  }
   
  render () {

    const {data} = this.props;

    return (
      <View style={styles.item_container}>
        <View style={styles.item}>
          <Image style={[styles.item_image]} source={{uri: data.image_url}} />
          <View style={styles.item_r}>
            {data.stitle !== '' ? <Text style={styles.item_title} numberOfLines={1}>{data.description}</Text>: <Text style={styles.item_title} numberOfLines={2}>{data.description}</Text>}
            <Text style={styles.item_cnt} numberOfLines={2}>{data.stitle}</Text>
            <View style={styles.item_btn}>
              <Image style={styles.item_icon} source={{uri:data.icon_url}}/>
              <Text style={styles.item_read}>{data.dynamic_info}</Text>
            </View>
          </View>
        </View>
        <View style={styles.item_line}></View>
      </View>
    )
  } 
}