const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} = require('react-native');
const { Component } = React;
const MapView = require('react-native-maps');

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';


const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    // backgroundColor: 'gray',
    padding: 20,
  }
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }
  componentWillMount() {
    console.log(MapView);
  }
  onRegionChange(region) {
   this.setState({ region });
  }
  render() {
    return (
      <View style={styles.menu}>
        <Text>Map Test</Text>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={{
            width:200,
            height:200
          }}
        />
      </View>
    );
  }
};

module.exports = Map