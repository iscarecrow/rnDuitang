import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as setExploreActions from '../actions/setExplore';

import { 
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  componentDidMount() {
    const {couponListData} = this.props;
    console.log('我拿到了 优惠券的数据了');
    console.log(couponListData);
  }
  _onPressButton() {
    const { exploreData,setExplore } = this.props;
    console.log(exploreData);
    setExplore('我被设置页面改变了。。')
  }
  render() {
    return (
      <View>
        <Text style={{marginTop: 200, alignSelf: 'center'}}>
            设置页面
        </Text>
        <TouchableHighlight onPress={()=> this._onPressButton()}>
          <Text style={{marginTop: 200, alignSelf: 'center'}}>
              点击设置发现页面数据
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

Set.propTypes = {
  couponListData: PropTypes.object.isRequired,
  setExplore: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    couponListData: state.couponListData,
    exploreData: state.exploreData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, setExploreActions), dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Set);