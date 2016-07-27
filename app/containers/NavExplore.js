'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  NavigatorIOS,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigatorActions from '../actions/navigator';

import Explore from './Explore';

class NavExplore extends Component {
  _handleNavigationRequest() {
    alert('分享还没做');
  }
  render() {
    const { navigatorData } = this.props;
    return (
      <NavigatorIOS
        initialRoute={{
          component: Explore,
          title: '发现',
          rightButtonTitle: '分享',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{flex:1}}
        tintColor="#333"
        barTintColor="green"
        titleTextColor="green"
      />
    );
  }
}

NavExplore.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NavExplore);