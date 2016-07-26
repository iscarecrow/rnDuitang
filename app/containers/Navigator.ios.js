'use strict';

import React, { Component, PropTypes } from 'react';
import { NavigatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as navigatorActions from '../actions/navigator';

import MainTab from './MainTab';

class Navigator extends Component {
  componentWillUpdate(nextProps, nextState) {
      console.log('nextProps');
      console.log(nextProps.refs);
      console.log(nextState);
      console.log(this.refs);
    // this.refs.nav.push({
    //   component: MainTab,
    //   title: navigatorData.title,
    // })
  }
  render() {
    const { navigatorData } = this.props;
    console.log('navigatorData.title');
    console.log(navigatorData.title);
    return (
      <NavigatorIOS
        initialRoute={{
          component: MainTab,
          title: navigatorData.title,
        }}
        style={{flex: 1}}
      />
    );
  }
}

Navigator.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);