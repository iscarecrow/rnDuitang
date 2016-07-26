import React, { Component } from 'react';
import { WebView } from 'react-native';


const WEBVIEW_REF = 'webview';

const DEFAULT_URL = 'http://buy.duitang.com/buy/youliao/';
// const DEFAULT_URL = 'https://github.com/facebook/react-native';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: DEFAULT_URL,
      notifCount: 0,
      presses: 0,
    }
  }

  render() {
    return (
      <WebView
        ref={WEBVIEW_REF}
        source={{uri: this.state.url}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        style={{marginTop: 20}}
      />
    );
  }
}

export default Store;