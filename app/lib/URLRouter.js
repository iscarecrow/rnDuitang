// 'use strict';

// let URLRouter = require('react-native').NativeModules.URLRouter;


const isHttp = /http(s)?\:\/\//ig;
const isDuitangSheme = /duitang\:\/\//ig;

let URLRouter = {
  handle: function(url) {

    if (isHttp.test(url)){
      // console.log('http');
      // console.log(url);
    } else if(isDuitangSheme.test(url)) {
      // console.log('schme');
      // console.log(url);
    } else {

    }
  }
}

module.exports = URLRouter;
