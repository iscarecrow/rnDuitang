'use strict';

import React from 'react-native';
import Request from '../lib/Request';

// view
// 大卡
import IndexBigCard from '../components/IndexBigCard';
// 小卡
import IndexSingleSmallCard from '../components/IndexSingleSmallCard';
// 时间条
import IndexTime from '../components/IndexTime';

// mock data
// import apiData from '../mock/apiData';

// import newapiData from '../mock/newapiData';

import {IndexApiAndriod} from '../constants/IndexApi';

// tools
import IndexDataTransform from '../part/IndexDataTransform';
import _ from 'underscore';

let {
  ListView,
  PullToRefreshViewAndroid,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} = React;

let styles = React.StyleSheet.create({
  flex_1: {
    flex: 1,
  }
});

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds,
      cacheList:[],
      loadingMore: true,
      isReach: true,
      isRefresh: false,
      limit:10,
      start:0,
    };
  }
  _loadCardFromServer () {
    let uri = `${IndexApiAndriod}&start=${this.state.start}&limit=${this.state.limit}`;
    let cache;
    let tableData;
    if (this.state.loadingMore && this.state.isReach) {
      Request.get(uri, (error, jsn) => {
        let json = JSON.parse(jsn);
        if (this.state.isRefresh) {
          cache = [];
          json.data.object_list.map((elem) =>{
            cache.push(elem);
          });
          tableData = IndexDataTransform(json.data.object_list);
        } else {
          cache = this.state.cacheList;
          json.data.object_list.map((elem) => {
            cache.push(elem);
          });
          tableData = IndexDataTransform(cache);
        }
        this.setState({
          loadingMore: json.data.more,
          isRefresh:false,
          isReach: false,
          cacheList:cache,
          dataSource:ds.cloneWithRows(tableData),
          start: json.data.next_start
        });
      });
    }
  }
  componentDidMount() {
    this._loadCardFromServer();
  }
  _onEndReached() {
    this.setState({
      isReach: true
    });
    this._loadCardFromServer();
  }
  _onRefresh() {
    this.setState({
      isRefresh: true,
      start:0
    });
    this._loadCardFromServer();
  }
  _renerRow (item) {
    return (
      <View style={styles.flex_1}>
        {_.isNumber(item) ? <IndexTime data={item}/> : null}
        {_.isArray(item) ? <IndexBigCard data={item}/> : null}
        {_.isObject(item) && !_.isArray(item) ? <IndexSingleSmallCard data={item}/> : null}
      </View>
    );
  }
  render () {
    return (
      <PullToRefreshViewAndroid
        style={styles.flex_1}
        refreshing={this.state.isRefresh}
        onRefresh={() => this._onRefresh()}
        colors={['#3498db','#3498db','#3498db']}
        >
        <ListView 
          style={styles.flex_1}
          initialListSize = {1}
          onEndReached = {() => this._onEndReached()}
          onEndReachedThreshold = {700}
          removeClippedSubviews = {false}
          dataSource={this.state.dataSource}
          renderRow={this._renerRow}/>
      </PullToRefreshViewAndroid>
    );
  } 
}