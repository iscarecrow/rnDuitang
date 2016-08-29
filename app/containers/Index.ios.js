'use strict';

import React, { PropTypes, Component } from 'react';
// import Request from '../lib/Request';
// import TableView from '../lib/TableView';
// import URLRouter from '../lib/URLRouter';
// import TableView from 'react-native-tableview';
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

import * as ApiServer from '../constants/ApiServer';
// tools
import IndexDataTransform from '../part/IndexDataTransform';

import _ from 'underscore';


// let Section = TableView.Section;
// let Item = TableView.Item;
// let Cell = TableView.Cell;


import {
  ListView,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

let styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  }
});

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:ds,
      tableSourece: [],
      cacheList:[],
      limit:10,
      start:0,
      refreshing:false,
      loadingMore:false,
      isReach:true
    };
  }
  _loadCardFromServer (refreshObjs) {

    // 方案三
    let uri = ApiServer.adBannerList + '&start=' + this.state.start +'&limit='+this.state.limit;
    console.log(uri);

    fetch(uri)
      .then(response => response.json())
      .then((jsn)=> {
        // 处理数据
        let cache = this.state.cacheList;

        jsn.data.object_list.map((elem) =>{
          cache.push(elem);
        });

        let tableData = IndexDataTransform(cache);
        console.log(jsn.data.next_start);
        this.setState({
          dataSource: ds.cloneWithRows(tableData),
          cacheList: cache,
          loadingMore:false,
          refreshing:false,
          isReach:false,
          start: jsn.data.next_start
        });

      });

    // dataSource

    // Request.get(uri, (error, jsn) => {
    //   // 重置页面
    //   if(refreshObjs && refreshObjs.hasOwnProperty('isRefresh') && refreshObjs.isRefresh) {

    //     let tableData = IndexDataTransform(jsn.data.object_list);

    //     this.setState({
    //       loadingMore:false,
    //       refreshing:false,
    //       tableSourece:tableData,
    //     });
    //   } else {
    //     // 处理数据
    //     let cache = this.state.cacheList;
    //     jsn.data.object_list.map((elem) =>{
    //       cache.push(elem);
    //     });

    //     let tableData = IndexDataTransform(cache);

    //     console.log(tableData)
    //     this.setState({
    //       tableSourece: tableData,
    //       cacheList: cache,
    //       loadingMore:false,
    //       refreshing:false,
    //       start: jsn.data.next_start
    //     });
    //   }

    // });
  }
  componentDidMount() {
    this._loadCardFromServer();
  }
  _onEndReached() {
    if (this.state.isReach)  return;

    this.setState({
      isReach: true
    });

    this._loadCardFromServer();
  }
  _onRefresh() {
    this.setState({
      refreshing:true,
    });
    this._loadCardFromServer({
      isRefresh:true,
    });
  }
  _onLoadMore() {
    this.setState({loadingMore:true});
    this._loadCardFromServer();
  }
  _onPress(event) {

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
      <Text>2222</Text>
    );
  }
}


// <ListView
//           style={styles.flex_1}
//           onEndReached = {() => this._onEndReached()}
//           enableEmptySections={true}
//           onEndReachedThreshold = {700}
//           dataSource={this.state.dataSource}
//           renderRow={this._renerRow}/>
