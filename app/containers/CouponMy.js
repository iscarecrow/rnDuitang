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
  TouchableNativeFeedback,
  Platform,
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

const couponType = {
  '未使用':1,
  '已使用':2,
  '已过期':4
}


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
    const {couponListData} = this.props;
    console.log(couponListData);
  }
  loadCouponList(coupon_status=1) {
    const {fetchCouponList,couponListData} = this.props;
    let limit = couponListData.limit;
    let start = couponListData.start;
    let data = {
      limit:limit,
      start: start,
      coupon_status:coupon_status
    }
    console.log(data);
    fetchCouponList(data);
  }
  selectTab(tabName) {
    const {selectCouponStatus} = this.props;
    let coupon_status = couponType[tabName];
    selectCouponStatus(coupon_status);
  }
  _renderRow(item) {
    const {couponListData} = this.props;
    let couponImage = null;
    if (couponListData.curStatus === 1) {
      couponImage = <Image source={require('../image/gift_voucher/gift_voucher_bg.png')}/>
    } else if (couponListData.curStatus === 2) {

    } else if (couponListData.curStatus === 4) {
      couponImage = <Image source={require('../image/gift_voucher/gift_voucher_bg_grey.png')}/>
    }

    if (couponListData.isLoadingMore) {
      return (
        <View style={styles.coupon_container}>
          {couponImage}
          <View style={styles.coupon_title}>
            <Text>{item.title}</Text>
          </View>
        </View>      
      )
    }
  }
  _renderHeader() {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return(
      <View>
        <View style={[styles.tabs_container,styles.flexContainer]}>
          <TouchableElement style={[styles.flex_1,styles.bg_gray]} onPress={()=>this.selectTab('未使用')}>
            <Text style={[styles.tab_text,styles.tab_text_on]}>未使用</Text>
          </TouchableElement>
          <TouchableElement style={[styles.flex_1,styles.tab_border_lf]} onPress={()=>this.selectTab('已使用')}>
            <Text style={[styles.tab_text,styles.tab_text_off]}>已使用</Text>
          </TouchableElement>
          <TouchableElement style={styles.flex_1} onPress={()=>this.selectTab('已过期')}>
            <Text style={[styles.tab_text,styles.tab_text_off]}>已过期</Text>
          </TouchableElement>
        </View>
        <View style={styles.line}></View>
      </View>
    )
  }
  _onEndReached() {
    this.loadCouponList();
    console.log('endReach');
  }
  render() {
    const {couponListData} = this.props;
    console.log('render');
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