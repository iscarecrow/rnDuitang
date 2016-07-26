// 'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import Me from './Me';
import Store from './Store';

class MainTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      notifCount: 0,
      presses: 0,
    }
  }
  renderMe() {
    return (
      <Me/>
    );
  }
  renderStore() {
    return (
      <Store/>
    );
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
    return (
       <TabBarIOS
        unselectedTintColor="#444"
        tintColor="#E54D42"
        barTintColor="#f7f8f9">
        <TabBarIOS.Item
          title="首页"
          icon={require('../image/tab_icon_home/tab_icon_home.png')}
          selectedIcon={require('../image/tab_icon_home_highlight/tab_icon_home_highlight.png')}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="发现"
          icon={require('../image/tab_icon_explore/tab_icon_explore.png')}
          selectedIcon={require('../image/tab_icon_explore_highlight/tab_icon_explore_highlight.png')}          
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../image/tab_icon_store/tab_icon_store.png')}
          selectedIcon={require('../image/tab_icon_store_highlight/tab_icon_store_highlight.png')}
          renderAsOriginal
          title="商店"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab'
            });
          }}>
          {this.renderStore()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../image/tab_icon_me/tab_icon_me.png')}
          selectedIcon={require('../image/tab_icon_me_highlight/tab_icon_me_highlight.png')}
          renderAsOriginal
          title="我"
          badge={this.state.presses > 0 ? this.state.presses : undefined}
          selected={this.state.selectedTab === 'MeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'MeTab',
              presses: this.state.presses + 1
            });
          }}>
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

export default MainTab;