// let DTrace = require('react-native').NativeModules.DTrace;

let DTrace = {
  event: function(key,subkey) {
    console.log('dtrace')
  }
}

module.exports = DTrace;
