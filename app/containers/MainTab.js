'use strict';

import React, { Component,PropTypes } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as navigatorActions from '../actions/navigator';
import * as mainTabActions from '../actions/mainTab';
import navigatorMainTab from '../constants/navigatorMainTab';

// 首页
import Index from './Index';
// 发现
import NavExplore from './NavExplore';
// 商店
import NavStore from './NavStore';
// 我
import NavMe from './NavMe';

class MainTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifCount: 0,
      presses: 0,
    }
  }
  renderMe() {
    return (
      <NavMe/>
    );
  }
  renderStore() {
    return (
      <NavStore/>
    );
  }
  renderIndex() {
    return (
      <Index/>
    );
  }
  renderExplore() {
    return(
      <NavExplore/>
    );
  }
  setNavigator(selectedTabName) {
    const { setTab, setNavigator } = this.props;
    const navigatorTitle = navigatorMainTab[selectedTabName];
    setTab(selectedTabName);
    // this.props.navigator.push({
    //   component: MainTab,
    //   title: navigatorTitle,
    // });
    // setNavigator(navigatorTitle);
  }
   _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }
  render() {
    const {mainTabData} = this.props;
    return (
       <TabBarIOS
        unselectedTintColor="#444"
        tintColor="#E54D42"
        barTintColor="#f7f8f9">
        <TabBarIOS.Item
          title="首页"
          icon={require('../image/tab_icon_home/tab_icon_home.png')}
          selectedIcon={require('../image/tab_icon_home_highlight/tab_icon_home_highlight.png')}
          selected={mainTabData.selectedTabName === 'home'}
          onPress={() => this.setNavigator('home')}>
          {this._renderContent('#333', 'home Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="发现"
          icon={require('../image/tab_icon_explore/tab_icon_explore.png')}
          selectedIcon={require('../image/tab_icon_explore_highlight/tab_icon_explore_highlight.png')}          
          selected={mainTabData.selectedTabName === 'explore'}
          onPress={() => this.setNavigator('explore')}>
          {this.renderExplore()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../image/tab_icon_store/tab_icon_store.png')}
          selectedIcon={require('../image/tab_icon_store_highlight/tab_icon_store_highlight.png')}
          renderAsOriginal
          title="商店"
          selected={mainTabData.selectedTabName === 'store'}
          onPress={() => this.setNavigator('store')}>
          {this.renderStore()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../image/tab_icon_me/tab_icon_me.png')}
          selectedIcon={require('../image/tab_icon_me_highlight/tab_icon_me_highlight.png')}
          renderAsOriginal
          title="我"
          badge={this.state.presses > 0 ? this.state.presses : undefined}
          selected={mainTabData.selectedTabName === 'me'}
          onPress={() => this.setNavigator('me')}>
          {this.renderMe()}
        </TabBarIOS.Item>
      </TabBarIOS>
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

MainTab.propTypes = {
  navigatorData: PropTypes.object.isRequired,
  mainTabData: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    navigatorData: state.navigatorData,
    mainTabData: state.mainTabData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, navigatorActions,mainTabActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);