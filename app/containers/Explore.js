import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder'
    }
  }
  componentDidMount() {
    const {exploreData} = this.props;
  }
  render() {
    const {exploreData} = this.props;
    return (
      <ScrollView>
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
      </ScrollView>
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
