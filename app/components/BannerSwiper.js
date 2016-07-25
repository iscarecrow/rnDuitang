import React from 'react-native';
var URLRouter = require('react-native').NativeModules.URLRouter;
var { requireNativeComponent } = require('react-native');
var Image = requireNativeComponent('DTImage', null);

var {
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
} = React;


let styles = React.StyleSheet.create({
  wrapper: {
    
  },
  slide: {
    flex: 1,
    flexDirection: 'row',
    minHeight:130,
    backgroundColor:'#fff',
  },
  item: {
    width:75,
    marginRight: 15,
    marginBottom: 22,
    backgroundColor:'#fff',
  },
  itemImages: {
    width: 75,
    height: 75,
    marginBottom:9,
  },
  itemText: {
    fontSize: 11
  },
});

export default class BannerSwiper extends React.Component {
  _onPressButton (url) {
    URLRouter.handle(url);
  }
  render () {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    let items = this.props.data.group_items.map((item,i) =>
      <View style={styles.item} key={i}>
        <TouchableElement onPress={()=>this._onPressButton(item.target)} underlayColor="transparent">
          <Image  style={styles.itemImages} source={{uri: item.icon_url}} />
        </TouchableElement>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
    return (
      <ScrollView style={styles.wrapper} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.slide}>
          {items}
        </View>
      </ScrollView>
    )
  } 
}