'use strict';

import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fetchOrderCountActions from '../actions/fetchOrderCount';
import * as setUnreadCountActions from '../actions/setUnreadCount';
import * as setUserInfoActions from '../actions/setUserInfo';
// import Request from '../lib/Request';
// import URLRouter from '../lib/URLRouter';
// import Image from '../lib/Image';
// import UserService from '../lib/UserService';
// import UnreadService from '../lib/UnreadService';
// import SimpleStorage from '../lib/SimpleStorage';
// import Application from "../lib/Application";
// import DTrace from "../lib/DTrace";
import * as Url from '../constants/UrlServer';
import * as Api from '../constants/ApiServer';
import * as BroadCastTypes from '../constants/BroadCastTypes';
import * as SimpleStorageTypes from '../constants/SimpleStorageTypes';

import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  PixelRatio,
  ScrollView,
  NativeAppEventEmitter
} from 'react-native';

let styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  bg_color: {
    backgroundColor:'rgba(234,235,236,1)',
  },
  bt: {
    backgroundColor:'rgba(234,235,236,1)',
    height:12    
  },
  border_top: {
    borderTopWidth: 1/PixelRatio.get(),
    borderColor:'rgba(0,0,0,0.16)',    
  },
  border_bottom: {
    borderBottomWidth: 1/PixelRatio.get(),
    borderColor:'rgba(0,0,0,0.16)',
  },
  me_container: {
    flexDirection:'row',
    height: 84,
    backgroundColor:'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  me_avatar_outer: {
    width: 60,
    height: 60,
    marginRight:10,
    marginTop:12,
    marginBottom:12,
    marginLeft:12,
  },
  me_avatar: {
    width: 60,
    height: 60,
    borderRadius:30,
  },
  me_daren: {
    position: 'absolute',
    right:0,
    bottom:0,
    width:21,
    height: 21
  },
  me_username: {
    color:'rgba(51,51,51,1)',
    fontWeight: 'bold',
    fontSize:15,
  },
  me_desc: {
    fontSize:12,
    marginTop:5,
    color:'rgba(153,153,153,1)',
  },
  me_icon_r:{
    width: 24,
    height: 24,
    right:12,
  },
  order_items: {
    height:72,
    flexDirection:'row',
    backgroundColor:'rgba(255,255,255,1)',
  },
  order_item: {
    alignItems: 'center', 
    justifyContent: 'center',
    position:'relative',
  },
  order_count_border_circle: {
    width:18,
    borderColor:'rgba(231,76,60,1)',
    borderWidth:1,
    borderRadius: 9,
    position:'absolute',
    right:41,
    top:4,
    backgroundColor:'rgba(255,255,255,1)',
    height:18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  order_count_border: {
    paddingLeft:4,
    paddingRight:4,
    borderColor:'rgba(231,76,60,1)',
    borderWidth:1,
    borderRadius: 10,
    position:'absolute',
    right:41,
    top:4,
    backgroundColor:'rgba(255,255,255,1)',
    height:18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  order_count: {
    color:'rgba(231,76,60,1)',
    backgroundColor:'rgba(255,255,255,0)',
    fontSize:12,
    alignItems: 'center',
    height:15,
    justifyContent: 'center',
  },
  order_image: {
    width:30,
    height:30,
  },
  order_desc: {
    fontSize:12,
    marginTop:8,
  },
  item:{
    flexDirection:'row',
    height:44,
    backgroundColor:'rgba(255,255,255,1)',
    alignItems: 'center', 
  },
  item_icon: {
    height:30,
    width:30,
    marginRight:10,
    marginTop:7,
    marginBottom:7,
    marginLeft:12,
  },
  item_red_count: {
    width:9,
    height:9,
    backgroundColor:'rgba(231,76,60,1)',
    borderRadius:4.5,
    position:'absolute',
    right:36,
    top:20,
  },
  item_count_border_circle: {
    width:18,
    borderColor:'rgba(231,76,60,1)',
    borderWidth:1,
    borderRadius: 9,
    position:'absolute',
    right:36,
    top:13,
    backgroundColor:'rgba(231,76,60,1)',
    height:18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_count_border: {
    paddingLeft:4,
    paddingRight:4,
    borderColor:'rgba(231,76,60,1)',
    borderWidth:1,
    borderRadius: 10,
    position:'absolute',
    right:36,
    top:13,
    backgroundColor:'rgba(231,76,60,1)',
    height:18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_count: {
    color:'rgba(255,255,255,1)',
    backgroundColor:'rgba(231,76,60,1)',
    fontSize:12,
    alignItems: 'center',
  },
  coupon_guide: {
    position:'absolute',
    right:36,
    top:7,
    flexDirection:'row',
  },
  coupon_guide_text: {
    color:'rgba(153,153,153,1)',
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:4,
    marginTop: 10,
  },
  coupon_guide_icon: {
    width:30,
    height:30,
  },
  promobag_text: {
    color:'rgba(153,153,153,1)',
    fontSize: 13,
    position:'absolute',
    right:36,
    top:16,
  },
  item_icon_r: {
    width: 24,
    height: 24,
    position: 'absolute',
    right:12,
    top:10,
  },
  item_desc: {
    color:'rgba(51,51,51,1)',
    fontSize:15,
  },
  item_line: {
    height: 1/PixelRatio.get(),
    paddingLeft:12
  }
});

let subscriptionDTJSSDKDidNotify;
let subscriptionMainPageTabDidSelect;
let subscriptionUserInfoDidChange;
let subscriptionMessageCountDidChange;

class Me extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 是否领取过,default 领取过
      hasGotFreshManCouponBag:true,
      // 是否是freshman, default 非新人
      isFreshman: false,
      // 福袋数
      promobagNewCount: 0,
      // 进入我的页面次数 默认0次
      visitMePageCount: 0,
      // 默认false, 非更新用户
      isUpdateUser: false,
      // 评论数
      allCommentCount:0,
      // 赞/收藏数
      allFavoriteCount:0,
      // 好友
      allRcommendFriendCount:0,
    }
  }
  componentWillMount() {
    // this.loadOrderListCount();
    // this.loadPromobagNewCount();
    // this.updateUserInfo();
    // this.loadUnreadCount();
  }
  componentDidMount() {
    // 设置我的礼包是否显示
    // this.setFreshmanLuckBag();
    // 初始化广播
    // this.broadCastStart(); 
    // 是否是更新用户
    // Application.isFirstInstalled().then(value => {
    //   this.setState({
    //     isUpdateUser: value
    //   })
    // });
  }
  componentWillUnmount() {
    subscriptionMainPageTabDidSelect.remove();
    subscriptionDTJSSDKDidNotify.remove();
    subscriptionUserInfoDidChange.remove();
    subscriptionMessageCountDidChange.remove();
  }
  responseMainPageTabDidSelect(action) {
    switch(action.type) {
      // 重新请求计数
      case 'me':
        this.loadOrderListCount();
        this.loadPromobagNewCount();
        break;
    }
  }
  onPressButton (url,dtraceKey) {
    if (dtraceKey) {
      DTrace.event("ME_TAB",{"TAB_SUB_GOTO":dtraceKey});
    }
    
    switch(url) {
      case 'duitang://www.duitang.com/my/message/comment/?new_message=1':
        UnreadService.readCommentCount();
        this.setState({
          allCommentCount: 0
        });
        break;
      case 'duitang://www.duitang.com/my/message/favorite_like/?new_message=1':
        UnreadService.readFavoriteLikeCount();
        this.setState({
          allFavoriteCount: 0
        });
        break;
      case Url.myLuckyBag:
        this.setState({
          promobagNewCount:0
        });
        break;
      case Url.myCoupon:
        UnreadService.readFreshManCoupon();
        break;
      case Url.peopleRecommend:
        UnreadService.readFriendCount();
        this.setState({
          allRcommendFriendCount: 0
        });
        break;
      case Url.myFavorite:
        // 我的收藏三次逻辑
        SimpleStorage.getInt(SimpleStorageTypes.key_visit_me_page_count).then( value => {
          if (value !== null) {
            let newCount;
            this.setState({visitMePageCount: value});
            if (value < 3) {
              newCount = value +1;
              SimpleStorage.setInt(SimpleStorageTypes.key_visit_me_page_count, newCount);
            }
          } else {
            SimpleStorage.setInt(SimpleStorageTypes.key_visit_me_page_count, 1);
          }
        });
        break;
    }

    URLRouter.handle(url);
  }

  broadCastStart() {
    const {setUnreadCount,setUserInfo} = this.props;
    // 底部tab 点击切换
    subscriptionMainPageTabDidSelect = NativeAppEventEmitter.addListener(
      'DTMainPageTabDidSelect',
      jsn => {
        this.responseMainPageTabDidSelect(jsn.data);
      }
    );
    // JsSdk类型从h5发送的广播
    subscriptionDTJSSDKDidNotify = NativeAppEventEmitter.addListener(
      'DTJSSDKDidNotify',
      jsn => {
        if (jsn.data.name == "freshman_coupon_receive_success") {
          this.setState({hasGotFreshManCouponBag: true});
          SimpleStorage.setBool(SimpleStorageTypes.key_has_got_freshman_couponbag, true);
        }
      }
    );
    //用户信息变化的通知 
    subscriptionUserInfoDidChange = NativeAppEventEmitter.addListener(
      'DTUserInfoDidChange',
      jsn => setUserInfo(jsn.data)
    );
    // unread 轮询的数据, 评论 收藏 聊天 添加好友
    subscriptionMessageCountDidChange = NativeAppEventEmitter.addListener(
      'DTMessageCountDidChange',
      jsn => setUnreadCount(jsn)
    );
  }
  updateUserInfo() {
    const { setUserInfo } = this.props;
    UserService.getAll().then(jsn => setUserInfo(jsn));
  }

  loadPromobagNewCount() {
    Request.get(Api.promobagNewCount).then(jsn => {
      this.setState({promobagNewCount:jsn.data.new_count});
    });
  }
  // 设置礼券 草
  setFreshmanLuckBag () {
    UserService.isFreshman().then(jsn => this.setState({isFreshman:jsn}));

    SimpleStorage.getBool(SimpleStorageTypes.key_has_got_freshman_couponbag).then((result,err) => {
      if (result !== null) {
        this.setState({
          hasGotFreshManCouponBag : result
        })
      } else {
        // 未领取
        SimpleStorage.setBool(SimpleStorageTypes.key_has_got_freshman_couponbag, false);
        this.setState({
          hasGotFreshManCouponBag: false
        })
      }
    });
  }
  loadUnreadCount() {
    const {setUnreadCount} = this.props;
    Request.get('http://www.duitang.com/napi/unread/').then(jsn => setUnreadCount(jsn));
  }
  loadOrderListCount() {
    const { fetchOrderCount } = this.props;
    fetchOrderCount();
  }
  render () {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    // 读取消息
    let urlMyMessageComment = Url.myMessageComment;
    let urlMyMessageFavorite = Url.myMessageFavorite;

    const { orderCountData, unreadCountData, userInfoData } = this.props;

    if (unreadCountData.allCommentCount > 0) {
      urlMyMessageComment = `${urlMyMessageComment}?new_message=1`;
    } else {
      urlMyMessageComment = `${urlMyMessageComment}?new_message=0`;
    }

    if (unreadCountData.allFavoriteCount > 0) {
      urlMyMessageFavorite = `${urlMyMessageFavorite}?new_message=1`;
    } else {
      urlMyMessageFavorite = `${urlMyMessageFavorite}?new_message=0`;
    }

    let urlPeopleDetail = `${Url.peopleDetail}?id=${userInfoData.id}`;

    return (
      <ScrollView style={styles.bg_color}>
        <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(urlPeopleDetail,'MYPROFILE')}>
          <View style={[styles.me_container,styles.border_bottom]}>
            <View style={styles.me_avatar_outer}>
              {userInfoData.avatar !== ""? <Image style={styles.me_avatar} source={{uri:userInfoData.avatar}}/> :null}
              {userInfoData.isDaren ? <Image style={styles.me_daren} source={require('../image/verified_icon_L/verified_icon_L.png')}/>:null}
            </View>
            <View style={styles.flex_1}>
              <Text style={styles.me_username}>{userInfoData.username}</Text>
              {userInfoData.shortDescription != "" ? <Text style={styles.me_desc}>{userInfoData.shortDescription}</Text>: null}
            </View> 
            <Image style={styles.me_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
          </View>
        </TouchableElement>
        <View style={styles.bt}></View>
        <TouchableElement  underlayColor={'rgb(70,70,70)'}  style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.orderAll,"MYORDER")}>
          <View style={[styles.item,styles.border_top]}>
            <Image style={styles.item_icon} source={require('../image/me_icon_order/me_icon_order.png')}/>
            <Text style={styles.item_desc}>我的订单</Text>
            <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
          </View>
        </TouchableElement>
        <View style={styles.item_line}></View>
        <View style={[styles.order_items,styles.border_bottom]}>
          <TouchableElement underlayColor={'rgba(217,217,217,0)'} style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.orderWaitPay)}>
            <View style={[styles.flex_1,styles.order_item]}>
              <Image style={styles.order_image} source={require('../image/icon_me_wait_pay.png')}/>
              {orderCountData.waitPayCount >0 &&orderCountData.waitPayCount <10? <View style={styles.order_count_border_circle}>
                <Text style={styles.order_count}>{orderCountData.waitPayCountText}</Text>
              </View>: null}
              { orderCountData.waitPayCount > 9 ? <View style={styles.order_count_border}>
                <Text style={styles.order_count}>{orderCountData.waitPayCountText}</Text>
              </View>: null}
              <Text style={styles.order_desc}>待付款</Text>
            </View>
          </TouchableElement>
          <TouchableElement underlayColor={'rgba(217,217,217,0)'} style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.orderWaitSend)}>
          <View style={[styles.flex_1,styles.order_item]}>
            <Image style={styles.order_image} source={require('../image/icon_send.png')}/>
            {orderCountData.waitSendCount >0 && orderCountData.waitSendCount <10 ? <View style={styles.order_count_border_circle}>
                <Text style={styles.order_count}>{orderCountData.waitSendCountText}</Text>
              </View>: null}
            {orderCountData.waitSendCount >9 ? <View style={styles.order_count_border}>
                <Text style={styles.order_count}>{orderCountData.waitSendCountText}</Text>
              </View>: null}
            <Text style={styles.order_desc}>待发货</Text>
          </View>
          </TouchableElement>
          <TouchableElement underlayColor={'rgba(217,217,217,0)'} style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.orderWaitReceive)}>
            <View style={[styles.flex_1,styles.order_item]}>
              <Image style={styles.order_image} source={require('../image/icon_receive.png')}/>
              {orderCountData.waitReceiveCount >0 && orderCountData.waitReceiveCount < 10? <View style={styles.order_count_border_circle}>
                <Text style={styles.order_count}>{orderCountData.waitReceiveCountText}</Text>
              </View>: null}
              {orderCountData.waitReceiveCount >9? <View style={styles.order_count_border}>
                <Text style={styles.order_count}>{orderCountData.waitReceiveCountText}</Text>
              </View>: null}
              <Text style={styles.order_desc}>待收货</Text>
            </View>
          </TouchableElement>
        </View>
        <View style={styles.bt}></View>

        <View style={[styles.item_container,styles.border_top,styles.border_bottom]}>
          <TouchableElement  underlayColor={'rgb(70,70,70)'} style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.myCoupon,"MYVOUCHER")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_coupon.png')}/>
              <Text style={styles.item_desc}>我的礼券</Text>
              {(this.state.isFreshman && !this.state.hasGotFreshManCouponBag) ? <View style={styles.coupon_guide}>
                <Text style={[styles.coupon_guide_text,styles.flex_1]}>堆糖商店新人礼包</Text>
                <Image style={[styles.coupon_guide_icon]} source={require('../image/icon_coupon_guide/icon_coupon_guide.png')}/>
              </View> : null}
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>
          <View style={styles.item_line}></View>
          <TouchableElement  underlayColor={'rgb(70,70,70)'}  style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.myLuckyBag,"MYLUCKYBAG")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_luckybag.png')}/>
              <Text style={styles.item_desc}>我的福袋</Text>
              {(this.state.promobagNewCount > 0) ? <Text style={styles.promobag_text}>您有{this.state.promobagNewCount}个新福袋</Text>: null}
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>
        </View>

        <View style={styles.bt}></View>

        <View style={[styles.item_container,styles.border_top,styles.border_bottom]}>  
          <TouchableElement underlayColor={'rgb(70,70,70)'}  onPress={()=>this.onPressButton(Url.myAlbum,"MYALBUM")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_album/me_icon_album.png')}/>
              <Text style={styles.item_desc}>我的专辑</Text>
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>

          <View style={styles.item_line}></View>
          <TouchableElement underlayColor={'rgb(70,70,70)'}  onPress={()=>this.onPressButton(Url.myArticle,"MYARTICLE")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/icon_explore_article/icon_explore_article.png')}/>
              <Text style={styles.item_desc}>我的文章</Text>
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>

          <View style={styles.item_line}></View>
          <TouchableElement underlayColor={'rgb(70,70,70)'}  onPress={()=>this.onPressButton(Url.myFavorite,"LIKEALBUM")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_collect/me_icon_collect.png')}/>
              <Text style={styles.item_desc}>我的收藏</Text>
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>

          <View style={styles.item_line}></View>
          <TouchableElement underlayColor={'rgb(70,70,70)'}  onPress={()=>this.onPressButton(Url.myHeapList,"MYHEAP")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_subscribe/me_icon_subscribe.png')}/>
              <Text style={styles.item_desc}>我的订阅</Text>
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>
        </View>
        <View style={styles.bt}></View>
        <View style={[styles.item_container,styles.border_top,styles.border_bottom]}>
          <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(urlMyMessageComment,"MYCOMMENT")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_comments/me_icon_comments.png')}/>
              <Text style={styles.item_desc}>评论</Text>
              {(unreadCountData.allCommentCount > 0) ? <View style={styles.item_red_count}></View>: null}
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>
          <View style={styles.item_line}></View>

          <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(urlMyMessageFavorite,"MYFAVLIKE")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_notification/me_icon_notification.png')}/>
              <Text style={styles.item_desc}>收藏/赞</Text>
              {(unreadCountData.allFavoriteCount > 0 ) ? <View style={styles.item_red_count}></View>: null}
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>

          <View style={styles.item_line}></View>
          <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(Url.letterThread,"MESSAGE")}>          
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_message/me_icon_message.png')}/>
              <Text style={styles.item_desc}>聊天</Text>
              {unreadCountData.letterCount > 0 && unreadCountData.letterCount<10? <View style={styles.item_count_border_circle}>
                <Text style={styles.item_count}>{unreadCountData.letterCountText}</Text>
              </View>: null}
               {unreadCountData.letterCount > 9 ? <View style={styles.item_count_border}>
                <Text style={styles.item_count}>{unreadCountData.letterCountText}</Text>
              </View>: null}    
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>
        </View>

        <View style={styles.bt}></View>
          <View style={[styles.item_container,styles.border_top,styles.border_bottom]}> 
            <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=> this.onPressButton(Url.peopleRecommend,"ADDFRIDENS")}>
              <View style={styles.item}>
                <Image style={styles.item_icon} source={require('../image/profile_icon_follow/profile_icon_follow.png')}/>
                <Text style={styles.item_desc}>添加好友</Text>
                {unreadCountData.allRcommendFriendCount > 0  && unreadCountData.allRcommendFriendCount<10 ? <View style={styles.item_count_border_circle}>
                  <Text style={styles.item_count}>{unreadCountData.recommendFriendCountText}</Text>
                </View>: null}
                {this.state.allRcommendFriendCount > 9 ? <View style={styles.item_count_border}>
                  <Text style={styles.item_count}>{unreadCountData.recommendFriendCountText}</Text>
                </View>: null}
                <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
              </View>
            </TouchableElement>
          </View>
        <View style={styles.bt}></View>
      </ScrollView>
    );
  } 
}

Me.propTypes = {
  orderCountData: PropTypes.object.isRequired,
  unreadCountData:PropTypes.object.isRequired,
  userInfoData:PropTypes.object.isRequired,
  fetchOrderCount: PropTypes.func.isRequired,
  setUnreadCount: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    orderCountData: state.orderCountData,
    unreadCountData: state.unreadCountData,
    userInfoData: state.userInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, fetchOrderCountActions,setUnreadCountActions,setUserInfoActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);