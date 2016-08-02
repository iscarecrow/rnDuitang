'use strict';

import React, { Component, PropTypes } from 'react';
import {
  NavigatorIOS
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigatorActions from '../actions/navigator';

import Me from './Me';
import Set from './Set';

class NavMe extends Component {
  _handleNavigationRequest(nextRoute) {
    this.refs.nav.push(nextRoute);
  }
  componentDidMount() {
    console.log('NavigatorIOS');
    console.log(this.refs);
  }
  render() {
    const { navigatorData } = this.props;
    const nextRoute = {
      leftButtonTitle: '',
      title: "设置",
      component: Set
    };
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: Me,
          title: '我',
          rightButtonIcon: require('../image/icon_set_dark/icon_set_dark.png'),
          passProps: { myProp: 'from me' },
          onRightButtonPress: () => this._handleNavigationRequest(nextRoute),
        }}
        style={{flex: 1}}
        tintColor="#333"
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
