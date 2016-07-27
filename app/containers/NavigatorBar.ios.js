'use strict';

import React, { Component, PropTypes } from 'react';
import { NavigatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigatorActions from '../actions/navigator';

import MainTab from './MainTab';

class NavigatorBar extends Component {
  componentWillUpdate(nextProps, nextState) {
    // this.refs.nav.push({
    //   component: MainTab,
    //   title: navigatorData.title,
    // })
  }
  _handleNavigationRequest() {
    alert('分享还没做')
  }
  render() {
    const { navigatorData } = this.props;
    return (
      <NavigatorIOS
        initialRoute={{
          component: MainTab,
          title: navigatorData.title,
          rightButtonTitle: '分享',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{flex: 1}}
      />
    );
  }
}

NavigatorBar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorBar);