import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';

import { connect } from 'react-redux';
import NavMe from './NavMe';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder'
    }
  }
  componentDidMount() {
    const {exploreData} = this.props;
    console.log(exploreData);
  }
  render() {
    const nextRoute = {
      title: "我",
      component: NavMe,
      rightButtonTitle: 'Cancel',
      onRightButtonPress: () => { this.refs.nav.navigator.pop(); }
    };
    const {exploreData} = this.props;
    return (
      <View>
        <Text style={{marginTop: 200, alignSelf: 'center',color:'green'}}>
          {exploreData.title}
        </Text>
        <Text style={{marginTop: 200, alignSelf: 'center'}}>
          点击去我的页面 {this.props.myProp}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    exploreData: state.exploreData,
  };
}


var styles = StyleSheet.create({
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

export default connect(mapStateToProps)(Explore);