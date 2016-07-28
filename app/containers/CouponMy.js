import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fetchCouponListActions from '../actions/fetchCouponList';

import { 
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ListView,
  PixelRatio,
  Image
} from 'react-native';

let styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flexContainer: {
    flexDirection:'row',
  },
  line: {
    height:1/PixelRatio.get(),
    backgroundColor:'rgba(0,0,0,0.18)',
  },
  tabs_container: {
    marginLeft:12,
    marginRight:12,
    marginTop:8,
    marginBottom:8,
    borderWidth:1,
    borderColor:'rgb(153,153,153)',
    borderRadius:2,
  },
  tab_border_lf:{
    borderRightWidth:1,
    borderLeftWidth:1,
    // borderRightWidth: 1/PixelRatio.get(),
    borderRightColor:'rgb(153,153,153)',
    // borderLeftWidth: 1/PixelRatio.get(),
    borderLeftColor:'rgb(153,153,153)',
  },
  tab_text:{
    textAlign:'center',
    alignItems:'center',
    fontSize:12,
    paddingTop:7,
    paddingBottom:7,
  },
  tab_text_off: {
    color:'rgb(153,153,153)',
  },
  tab_text_on:{
    color:'rgb(255,255,255)',
  },
  coupon_container:{
    marginLeft:26,
    marginRight:26,
    marginTop:15,
    position:'relative',
  },
  coupon_title:{
    position:'absolute',
    top:10,
    left:20,
  },
  bg_gray:{
    backgroundColor:'#aaa'
  }
});

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class CouponMy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
    this.loadCouponList()    
  }
  componentDidMount() {

  }
  loadCouponList() {
    const {fetchCouponList} = this.props;
    fetchCouponList();
  }
  _renderRow(item) {
    console.log(item);
    const {couponListData} = this.props;
    if (couponListData.isLoadingMore) {
      return (
        <View style={styles.coupon_container}>
          <Image source={require('../image/gift_voucher/gift_voucher_bg.png')}/>
          <View style={styles.coupon_title}>
            <Text>{item.title}</Text>
          </View>
        </View>      
      )
    }
  }
  _renderHeader() {
    return(
      <View>
        <View style={[styles.tabs_container,styles.flexContainer]}>
          <View style={[styles.flex_1,styles.bg_gray]}>
            <Text style={[styles.tab_text,styles.tab_text_on]}>未使用</Text>
          </View>
          <View style={[styles.flex_1,styles.tab_border_lf]}>
            <Text style={[styles.tab_text,styles.tab_text_off]}>已使用</Text>
          </View>
          <View style={styles.flex_1}>
            <Text style={[styles.tab_text,styles.tab_text_off]}>已过期</Text>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
    )
  }
  _onEndReached() {
    this.loadCouponList();
    console.log('bababa');
  }
  render() {
    const {couponListData} = this.props;
    return (
      <ListView
        style={styles.flex_1}
        renderHeader={()=>this._renderHeader()}
        onEndReached={()=>this._onEndReached()}
        onEndReachedThreshold = {700}
        dataSource={ds.cloneWithRows(couponListData.dataSource)}
        renderRow={(item)=>this._renderRow(item)}
        enableEmptySections={true}
      />
    );
  }
}

CouponMy.propTypes = {
  couponListData: PropTypes.object.isRequired,
  fetchCouponList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    couponListData: state.couponListData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},fetchCouponListActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponMy);