/**
 * @description 基础工具库
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-02-17T14:47:51+0800
 */
;(function(root, factory){
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return (root.DtTools = factory());
    });

  } else if (typeof exports === 'object') {
    module.exports = factory();

  } else {
    root.DtTools = factory();
  }
}(this || global, function(){
  let DtTools = {};
  DtTools.VERSION = '0.0.1';
/**
 * [dtImageTrans description]
 * @param       {[string]}                 url [图片url]
 * @param       {[boolean]}                t   [是否裁剪]
 * @param       {[string]}                 w   [宽度]
 * @param       {[string]}                 h   [高度]
 * @param       {[string]}                 c   [裁剪区域, c中间, a上面，b下面]
 * @return      {[string]}                     [裁剪后的图片]
 * @description
 * @author      hugin
 * @updateTime  2016-02-03T13:58:54+0800
 */
  DtTools.dtImageTrans = function(url, t, w, h, c) {
    let pathn = url.trim().replace(/^http(s)?:\/\//ig, '');
    let pathn_array = pathn.split('/');
    let domain = pathn_array[0];
    let path = pathn_array[1];
    if (t) {
      w = w || 0;
      h = h || 0;
      c = c ? '_' + c : '';
      return this.dtImageTrans(url).replace(/(\.[a-z_]+)$/ig, '.thumb.' + w + '_' + h + c + '$1');
    } else {
      return url.replace(/(?:\.thumb\.\w+|\.[a-z]+!\w+)(\.[a-z_]+)$/ig, '$1');
    }
  };

/**
 * [dtUriTrans description]
 * @param       {[string]}                 uri  [不带参数api]
 * @param       {[string]}                 data [参数]
 * @return      {[string]}                      [带参数的api]
 * @description
 * @author      hugin
 * @updateTime  2016-02-03T14:22:39+0800
 */
  DtTools.dtUriTrans = function(uri, data) {
    if (data == undefined) {
      return uri;
    } else {
      let uriParamArray = [];
      for (let key in data) {
        let a = `${key}=${data[key]}`;
        uriParamArray.push(a);
      }
      let uriParam = uriParamArray.join('&');
      let newUri = `${uri}?${uriParam}` || '';
      return newUri;
    }
  };

  /**
   * [getParams description]
   * @param       {[string]}                 url [可传可不传]
   * @return      {[object]}                     [参数对象]
   * @description  获取url的参数
   * @author      hugin<hxjlucky@gmail.com>
   * @updateTime  2016-02-17T14:19:40+0800
   */
  DtTools.getParams = function(url) {
    if (!url) url = window.location.href;
    let opts = {},name, value, i;
        url = url.split('#')[0];
    let idx = url.indexOf('?'),
        search = idx > -1 ? url.substr(idx + 1) : '',
        arrtmp = search.split('&');
    for (let i = 0; i < arrtmp.length; i++) {
      let paramCount = arrtmp[i].indexOf('=');
      if (paramCount > 0) {
        name = arrtmp[i].substring(0, paramCount);
        value = arrtmp[i].substr(paramCount + 1);
        try {
          if (value.indexOf('+') > -1) {
            value = value.replace(/\+/g, ' ');
          }
          opts[name] = decodeURIComponent(value);
        } catch (exp) {}
      }
    }
    return opts;
  };

  DtTools.addParam = function(url,param,value) {
    let re = new RegExp('([&\\?])' +param+ '=[^& ]*','g');

    url = url.replace(re,function (a,b){
      return b == '?' ? '?' : ''
    })
    var idx = url.indexOf('?');
    url += (idx > -1 ? idx+1 != url.length ? '&' : '' : '?') + param + '=' + value;
    return url
  }

/**
 * [sdkVersion description]
 * @return      {[number]}                 [客户端webview写入的sdk版本号]
 * @description  获取webview版本号
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-02-17T14:20:50+0800
 */
  DtTools.sdkVersion = function() {
    let ua = navigator.userAgent.toLowerCase();
    let jssdk = /(jssdk)[ \/]([\w.]+)/;
    let match = jssdk.exec(ua);
    let version;
    if (match === null) {
      version = '0';
      return parseFloat(version);
    } else {
      version = match[2] || '0.1';
      return parseFloat(version);
    }
  };
/**
 * [gaq description]
 * @return      {[type]}                 [无]
 * @description 打点方法
 * @author      hugin<hxjlucky@gmail.com>
 * @updateTime  2016-02-17T14:21:41+0800
 */
  DtTools.gaq = function(trc) {
     typeof _gaq != "undefined" && _gaq && _gaq.push(['_trackPageview', trc]);
    console.log(trc);
  };
   /*
    @说明： 是否在堆糖内打开
    */
   DtTools.isDuiTang = function() {
      var r = /(duitang)/ig;
      return this.testUa(r);
    };
    /*
    @说明： 是否在微信内打开
    */
    DtTools.isWeiXin = function() {
      var r = /(micromessenger)/ig;
      return this.testUa(r);
    };
    DtTools.isWeiBo = function() {
      var r = /(weibo)/ig;
      return this.testUa(r);
    };
    DtTools.testUa = function(r) {
      var ua = navigator.userAgent.toLowerCase();
      return r.test(ua) ? true : false;
    };
    DtTools.timeFormat = function(time,fmt) { //author: meizz
       time = time? time.replace(/-/g, "/"): '';
       time = new Date(time);
        var o = {
            "M+": time.getMonth() + 1, //月份
            "d+": time.getDate(), //日
            "h+": time.getHours(), //小时
            "m+": time.getMinutes(), //分
            "s+": time.getSeconds(), //秒
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度
            "S": time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    DtTools.getCookie = function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
   };
  return DtTools;

}));