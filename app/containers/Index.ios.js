'use strict';

import React from 'react-native';
import Request from '../lib/Request';
import TableView from '../lib/TableView';
import URLRouter from '../lib/URLRouter';


// view
// 大卡
import IndexBigCard from '../components/IndexBigCard';
// 小卡
import IndexSingleSmallCard from '../components/IndexSingleSmallCard';
// 时间条
import IndexTime from '../components/IndexTime';

// mock data
import apiData from '../mock/apiData';

import newapiData from '../mock/newapiData';

import {IndexApi} from '../constants/IndexApi';

// tools
import IndexDataTransform from '../part/IndexDataTransform';
import _ from 'underscore';


let Section = TableView.Section;
let Item = TableView.Item;
let Cell = TableView.Cell;


let {
  ListView,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View
} = React;

let styles = React.StyleSheet.create({
  flex_1: {
    flex: 1,
  }
});


export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableSourece: [],
      cacheList:[],
      limit:10,
      start:0,
      refreshing:false,
      loadingMore:false,
    };
  }
  _loadCardFromServer (refreshObjs) {
    
    // 方案三
    let uri = IndexApi + '&start=' + this.state.start +'&limit='+this.state.limit;
    
    Request.get(uri, (error, jsn) => {
      // 重置页面
      if(refreshObjs && refreshObjs.hasOwnProperty('isRefresh') && refreshObjs.isRefresh) {

        let tableData = IndexDataTransform(jsn.data.object_list);

        this.setState({
          loadingMore:false,
          refreshing:false,
          tableSourece:tableData,
        });
        // this.setState({
        //   tableSourece: [],
        //   cacheList: [],
        //   loadingMore:false,
        //   refreshing:false,
        // });
      } else {
        // 处理数据
        let cache = this.state.cacheList;
        jsn.data.object_list.map((elem) =>{
          cache.push(elem);
        });
        
        let tableData = IndexDataTransform(cache);
        
        console.log(tableData)
        this.setState({
          tableSourece: tableData,
          cacheList: cache,
          loadingMore:false,
          refreshing:false,
          start: jsn.data.next_start
        });
      }

    });
  }
  componentDidMount() {
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
    // URLRouter.handle("duitang://www.duitang.com/album/detail/?id=74533204");
  }
  render () {

    function renderCard(item) {
      if (_.isNumber(item)) {
        return <Cell><IndexTime data={item}/></Cell>
      } else if (_.isArray(item)) {
        return <Cell><IndexBigCard data={item}/></Cell>
      } else if (_.isObject(item) && !_.isArray(item)) {
        return <Cell><IndexSingleSmallCard data={item}/></Cell>
      }
    }
    
    let items = this.state.tableSourece.map((item,i) =>
      <Section key={i} style={styles.flex_1}>
        {renderCard(item)}
      </Section>
    );

    return (
      <TableView style={styles.flex_1}
        refreshing={this.state.refreshing}
        loadingMore={this.state.loadingMore}
        onLoadingStart={()=>this._onLoadMore()}
        onRefreshStart={()=>this._onRefresh()} 
        onPress={(event) => this._onPress(event)}
         >
        {items}
      </TableView>
    );
  } 
}