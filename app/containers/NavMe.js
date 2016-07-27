'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  NavigatorIOS 
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigatorActions from '../actions/navigator';

import Me from './Me';
import NavStore from './NavStore';

class NavMe extends Component {
  _handleNavigationRequest(nextRoute) {
    alert('分享还没做');
    console.log(this.props);

    this.props.navigator.push(nextRoute);
  }
  render() {
    const { navigatorData } = this.props;

    const nextRoute = {
      title: "购物车",
      component: NavStore,
      rightButtonTitle: 'Cancel',
      onRightButtonPress: () => { this.refs.nav.navigator.pop(); }
    };
    

    return (
      <NavigatorIOS
        initialRoute={{
          component: Me,
          title: '我',
          rightButtonTitle: '购物车',
          onRightButtonPress: () => this._handleNavigationRequest(nextRoute),
        }}
        style={{flex: 1}}
        tintColor="#008888"
      />
    );
  }
}

NavMe.propTypes = {
  navigatorData: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    navigatorData: state.navigatorData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, navigatorActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMe);