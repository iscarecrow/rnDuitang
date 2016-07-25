'use strict';

import React, { Component } from 'react';
// import Request from '../lib/Request';
// import URLRouter from '../lib/URLRouter';
// import Image from '../lib/Image';
// import UserService from '../lib/UserService';
// import UnreadService from '../lib/UnreadService';
// import SimpleStorage from '../lib/SimpleStorage';
// import Application from "../lib/Application";
// import DTrace from "../lib/DTrace";
import DtTools from '../common/dtTools';
import * as Url from '../constants/UrlServer';
import * as Api from '../constants/ApiServer';
import * as BroadCastTypes from '../constants/BroadCastTypes';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
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
      user: {
        id: "",
        username: "",
        avatar: "",
        identity:[],
        isDaren:false,
        shortDescription:""
      },
      orderList: {
        waitReceiveCount: 0,
        waitSendCount: 0,
        waitPayCount: 0,
        waitReceiveCountText:'',
        waitSendCountText: '',
        waitPayCountText: '',
      },
      unreadInfo: {
        albumFavoriteCount:0,
        albumLikeCount:0,
        articleCommentCount:0,
        articleFavoriteCount:0,
        articleLikeCount:0,
        blogCommentCount:0,
        blogForwardCount:0,
        blogLikeCount:0,
        letterCount:0,
        letterCountText: 0,
        messagegCount:0,
        recommendFriendCount:0,
        recommendFriendCountText:0,
        topicCommentLikeCount:0,
        topicCommentReplyCount:0,
        topicCommentCount:0
      },
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
      case 'http://buy.duitang.com/buy/promobagList/?__urlopentype=pageweb':
        this.setState({
          promobagNewCount:0
        });
        break;
      case 'duitang://www.duitang.com/my/message/favorite_like/?new_message=1':
        UnreadService.readFavoriteLikeCount();
        this.setState({
          allFavoriteCount: 0
        });
        break;
      case 'http://buy.duitang.com/buy/coupon/my/?__urlopentype=pageweb':
        UnreadService.readFreshManCoupon();
        break;
      case 'duitang://www.duitang.com/people/recommend/':
        UnreadService.readFriendCount();
        this.setState({
          allRcommendFriendCount: 0
        });
        break;
      
      // 我的收藏三次逻辑
      case 'duitang://www.duitang.com/my/favorite/':
        SimpleStorage.getInt('key_visit_me_page_count').then( value => {
          if (value !== null) {
            let newCount;
            this.setState({visitMePageCount: value});
            if (value < 3) {
              newCount = value +1;
              SimpleStorage.setInt('key_visit_me_page_count', newCount);
            }
          } else {
            SimpleStorage.setInt('key_visit_me_page_count', 1);
          }
        });
        break;
    }

    URLRouter.handle(url);
  }

  broadCastStart() {
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
          SimpleStorage.setBool('key_has_got_freshman_couponbag', true);
        }
      }
    );
    //用户信息变化的通知 
    subscriptionUserInfoDidChange = NativeAppEventEmitter.addListener(
      'DTUserInfoDidChange',
      jsn => this.setUserInfo(jsn.data)
    );
    // unread 轮询的数据, 评论 收藏 聊天 添加好友
    subscriptionMessageCountDidChange = NativeAppEventEmitter.addListener(
      'DTMessageCountDidChange',
      jsn => {
        this.setUnreadCount(jsn)
      }
    );
  }
  updateUserInfo() {
    // let user = await UserService.getAll();
    // this.setUserInfo(user);
    UserService.getAll().then(jsn => this.setUserInfo(jsn));
  }

  loadPromobagNewCount() {
    Request.get(Api.promobagNewCount).then(jsn => {
      this.setState({promobagNewCount:jsn.data.new_count});
    });
  }
  // 设置礼券 草
  setFreshmanLuckBag () {
    UserService.isFreshman().then(jsn => this.setState({isFreshman:jsn}));

    SimpleStorage.getBool('key_has_got_freshman_couponbag').then((result,err) => {
      if (result !== null) {
        this.setState({
          hasGotFreshManCouponBag : result
        })
      } else {
        // 未领取
        SimpleStorage.setBool('key_has_got_freshman_couponbag', false);
        this.setState({
          hasGotFreshManCouponBag: false
        })
      }
    });
  }
  // 设置User信息
  setUserInfo(jsn) {
    let reg = /_certify/ig;
    let identity = jsn.identity || [];
    let isDaren = identity.some(item => reg.test(item) == true);
    jsn.avatar = DtTools.dtImageTrans(jsn.avatar, true, 100, 100, 'c');
    this.setState({user:{
      id: jsn.id,
      username: jsn.username,
      avatar:jsn.avatar,
      identity: identity,
      isDaren:isDaren,
      shortDescription:jsn.short_description
    }}) 
  }
  // 设置未读计数
  setUnreadCount(jsn) {
    let letter_count_text =jsn.data.letter_count || 0;
    let article_favorite_count = jsn.data.article_favorite_count || 0;
    let album_favorite_count = jsn.data.album_favorite_count ||0;
    let recommend_friend_count_text = jsn.data.recommend_friend_count;
    let allCommentCount = jsn.data.blog_comment_count + jsn.data.topic_comment_count + jsn.data.topic_comment_reply_count + jsn.data.article_comment_count;

    let allFavoriteCount = jsn.data.blog_like_count + jsn.data.blog_forward_count + album_favorite_count +jsn.data.album_like_count +jsn.data.topic_comment_like_count + jsn.data.article_like_count + article_favorite_count;

    if (jsn.data.letter_count > 99) {
      letter_count_text = '99+'; 
    }
    if (jsn.data.recommend_friend_count > 99) {
      recommend_friend_count_text = '99+';
    }
    this.setState({
      allCommentCount:allCommentCount,
      allFavoriteCount:allFavoriteCount,
      allRcommendFriendCount: jsn.data.recommend_friend_count,
      unreadInfo: {
        albumFavoriteCount:jsn.data.album_favorite_count,
        albumLikeCount:jsn.data.album_like_count,
        articleCommentCount:jsn.data.article_comment_count,
        articleFavoriteCount:jsn.data.article_favorite_count,
        articleLikeCount:jsn.data.article_like_count,
        blogCommentCount:jsn.data.blog_comment_count,
        blogForwardCount:jsn.data.blog_forward_count,
        blogLikeCount:jsn.data.blog_like_count,
        letterCount:jsn.data.letter_count,
        letterCountText:letter_count_text,
        recommendFriendCount:jsn.data.recommend_friend_count,
        recommendFriendCountText: recommend_friend_count_text,
        topicCommentLikeCount:jsn.data.topic_comment_like_count,
        topicCommentReplyCount:jsn.data.topic_comment_reply_count,
        topicCommentCount:jsn.data.topic_comment_count
      }
    })
  }
  loadUnreadCount() {
    Request.get('http://www.duitang.com/napi/unread/').then(jsn => {
      this.setUnreadCount(jsn)
    });
  }
  loadOrderListCount() {
    let orderListApi = Api.orderListCount+"?order_status=to_be_paid,to_be_delivered,to_be_received";
    Request.get(orderListApi).then(jsn => {
      let to_be_received = jsn.data.to_be_received || 0;
      let to_be_delivered =  jsn.data.to_be_delivered || 0;
      let to_be_paid = jsn.data.to_be_paid || 0;

      let to_be_delivered_text = to_be_delivered;
      let to_be_received_text  = to_be_received ;
      let to_be_paid_text = to_be_paid;

      if (to_be_delivered > 99) {
        to_be_delivered_text ='99+';
      }
      if (to_be_received > 99) {
        to_be_received_text = '99+';
      }
      if (to_be_paid > 99) {
        to_be_paid_text = '99+';
      }
      this.setState({
        orderList: {
          waitReceiveCount: to_be_received,
          waitSendCount: to_be_delivered,
          waitPayCount: to_be_paid,
          waitReceiveCountText: to_be_received_text,
          waitSendCountText: to_be_delivered_text,
          waitPayCountText: to_be_paid_text
        }
      });
    });
  }
  render () {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    // 读取消息
    let urlMyMessageComment = Url.myMessageComment;
    let urlMyMessageFavorite = Url.myMessageFavorite;

    if (this.state.allCommentCount > 0) {
      urlMyMessageComment = urlMyMessageComment + '?new_message=1';
    } else {
      urlMyMessageComment = urlMyMessageComment + '?new_message=0';
    }

    if (this.state.allFavoriteCount > 0) {
      urlMyMessageFavorite = urlMyMessageFavorite + '?new_message=1';
    } else {
      urlMyMessageFavorite = urlMyMessageFavorite + '?new_message=0';
    }
    let urlPeopleDetail = Url.peopleDetail + '?id=' + this.state.user.id;
    
    return (
      <ScrollView style={styles.bg_color}>
        <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(urlPeopleDetail,'MYPROFILE')}>
          <View style={[styles.me_container,styles.border_bottom]}>
            <View style={styles.me_avatar_outer}>
              {this.state.user.avatar !== ""? <Image style={styles.me_avatar} source={{uri:this.state.user.avatar}}/> :null}
              {this.state.user.isDaren ? <Image style={styles.me_daren} source={require('../image/verified_icon_L/verified_icon_L.png')}/>:null}
            </View>
            <View style={styles.flex_1}>
              <Text style={styles.me_username}>{this.state.user.username}</Text>
              {this.state.user.shortDescription != "" ? <Text style={styles.me_desc}>{this.state.user.shortDescription}</Text>: null}
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
              {this.state.orderList.waitPayCount >0 &&this.state.orderList.waitPayCount <10? <View style={styles.order_count_border_circle}>
                <Text style={styles.order_count}>{this.state.orderList.waitPayCountText}</Text>
              </View>: null}
              { this.state.orderList.waitPayCount > 9 ? <View style={styles.order_count_border}>
                <Text style={styles.order_count}>{this.state.orderList.waitPayCountText}</Text>
              </View>: null}
              <Text style={styles.order_desc}>待付款</Text>
            </View>
          </TouchableElement>
          <TouchableElement underlayColor={'rgba(217,217,217,0)'} style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.orderWaitSend)}>
          <View style={[styles.flex_1,styles.order_item]}>
            <Image style={styles.order_image} source={require('../image/icon_send.png')}/>
            {this.state.orderList.waitSendCount >0 && this.state.orderList.waitSendCount <10 ? <View style={styles.order_count_border_circle}>
                <Text style={styles.order_count}>{this.state.orderList.waitSendCountText}</Text>
              </View>: null}
            {this.state.orderList.waitSendCount >9 ? <View style={styles.order_count_border}>
                <Text style={styles.order_count}>{this.state.orderList.waitSendCountText}</Text>
              </View>: null}
            <Text style={styles.order_desc}>待发货</Text>
          </View>
          </TouchableElement>
          <TouchableElement underlayColor={'rgba(217,217,217,0)'} style={[styles.flex_1]} onPress={()=>this.onPressButton(Url.orderWaitReceive)}>
            <View style={[styles.flex_1,styles.order_item]}>
              <Image style={styles.order_image} source={require('../image/icon_receive.png')}/>
              {this.state.orderList.waitReceiveCount >0 && this.state.orderList.waitReceiveCount < 10? <View style={styles.order_count_border_circle}>
                <Text style={styles.order_count}>{this.state.orderList.waitReceiveCountText}</Text>
              </View>: null}
              {this.state.orderList.waitReceiveCount >9? <View style={styles.order_count_border}>
                <Text style={styles.order_count}>{this.state.orderList.waitReceiveCountText}</Text>
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
              {(this.state.allCommentCount > 0) ? <View style={styles.item_red_count}></View>: null}
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>
          <View style={styles.item_line}></View>

          <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(urlMyMessageFavorite,"MYFAVLIKE")}>
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_notification/me_icon_notification.png')}/>
              <Text style={styles.item_desc}>收藏/赞</Text>
              {(this.state.allFavoriteCount > 0 ) ? <View style={styles.item_red_count}></View>: null}
              <Image style={styles.item_icon_r} source={require('../image/icon_forward.imageset/icon_forward.png')}/>
            </View>
          </TouchableElement>

          <View style={styles.item_line}></View>
          <TouchableElement underlayColor={'rgb(70,70,70)'} onPress={()=>this.onPressButton(Url.letterThread,"MESSAGE")}>          
            <View style={styles.item}>
              <Image style={styles.item_icon} source={require('../image/me_icon_message/me_icon_message.png')}/>
              <Text style={styles.item_desc}>聊天</Text>
              {this.state.unreadInfo.letterCount > 0 && this.state.unreadInfo.letterCount<10? <View style={styles.item_count_border_circle}>
                <Text style={styles.item_count}>{this.state.unreadInfo.letterCountText}</Text>
              </View>: null}
               {this.state.unreadInfo.letterCount > 9 ? <View style={styles.item_count_border}>
                <Text style={styles.item_count}>{this.state.unreadInfo.letterCountText}</Text>
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
                {this.state.allRcommendFriendCount > 0  && this.state.allRcommendFriendCount<10 ? <View style={styles.item_count_border_circle}>
                  <Text style={styles.item_count}>{this.state.unreadInfo.recommendFriendCountText}</Text>
                </View>: null}
                {this.state.allRcommendFriendCount > 9 ? <View style={styles.item_count_border}>
                  <Text style={styles.item_count}>{this.state.unreadInfo.recommendFriendCountText}</Text>
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

export default Me