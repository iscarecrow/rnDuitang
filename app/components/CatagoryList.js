import React from 'react-native';
var URLRouter = require('react-native').NativeModules.URLRouter;

var {
  Text,
  View,
  PixelRatio,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var styles = React.StyleSheet.create({
  itemOuter: {
    marginBottom: 40,
    minHeight: 100,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  header: {
    height:18,
    width:65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:9,
    marginRight:6,
  },
  headerText: {
    color: '#fff',
    fontSize:10,
  },
  headerBorderOuter: {
    flex:1,
    height:18,
    justifyContent: 'center',
  },
  headerBorder: {
    height:1/ PixelRatio.get(),
  },
  item: {
    flex:1,
    height: 16,
    marginTop: 22,
  },
  itemText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333'
  }
});


headerStyle = function (options) {
  switch (options) {
    case 0:
      return {
        backgroundColor: '#EC7368',
      };
    case 1:
      return {
        backgroundColor: '#B787CA',
      };
    case 2: 
      return {
        backgroundColor: '#50D488',
      };
    case 3:
      return {
        backgroundColor: '#F2CA27',
      };
    case 4:
      return {
        backgroundColor: '#61AFE3',
      };   
  }
};

borderStyle = function(options) {
  switch (options) {
    case 0:
      return {
        backgroundColor: 'rgba(249,209,206,1)',
      };
    case 1:
      return {
        backgroundColor: 'rgba(233,220,240,1)',
      };
    case 2: 
      return {
        backgroundColor: 'rgba(185,238,207,1)',
      };
    case 3:
      return {
        backgroundColor: 'rgba(249,233,163,1)',
      };
    case 4:
      return {
        backgroundColor: 'rgba(204,229,246,1)',
      };   
  }
};

export default class CatagoryList extends React.Component {
  _onPressButton (url) {
    URLRouter.handle(url);
  }
  renderItems (value,index) {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return ( 
      <View style={styles.flexContainer} key={index}>
          <View style={styles.item}>
            <TouchableElement onPress={()=>this._onPressButton(value.target0)} underlayColor="transparent">
              <Text style={styles.itemText}>{value.name0}</Text>
            </TouchableElement>
          </View>
          <View style={styles.item}>
            <TouchableElement onPress={()=>this._onPressButton(value.target1)} underlayColor="transparent">
              <Text style={styles.itemText}>{value.name1}</Text>
            </TouchableElement>
          </View>
      </View>
    )
  }
  render () {
    let titles = this.props.data.map((item,i) =>
      <View style={styles.itemOuter} key={i}>
        <View style={styles.headerContainer}>
          <View style={[styles.header, headerStyle(i)]}>
            <Text style={styles.headerText}>{item.group_name}</Text>
          </View>
          <View style={styles.headerBorderOuter}>
            <View style={[styles.headerBorder,borderStyle(i)]}></View>
          </View>
        </View>
        {item.new_group_items.map((value,index)=> this.renderItems(value,index))}
      </View>
    );
    return (
      <View>
        {titles}
      </View> 
    )
  }
}