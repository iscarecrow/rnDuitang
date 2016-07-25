import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import Me from './containers/Me';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Me/>          
        <DevTools />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}