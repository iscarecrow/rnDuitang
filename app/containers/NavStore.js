'use strict';

import React, { Component, PropTypes } from 'react';
import { NavigatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigatorActions from '../actions/navigator';

import Store from './Store';

class NavStore extends Component {
  render() {
    const { navigatorData } = this.props;
    return (
      <NavigatorIOS
        initialRoute={{
          component: Store,
          title: '堆糖商店',
        }}
        style={{flex: 1}}
      />
    );
  }
}

NavStore.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NavStore);