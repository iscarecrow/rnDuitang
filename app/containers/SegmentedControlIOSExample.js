import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet
} from 'react-native';

// class SegmentedControlIOSExample extends Component {
//   render() {
//     return (
//       <View>
//         <View style={{marginBottom: 10}}>
//           <SegmentedControlIOS values={['One', 'Two']} />
//         </View>
//         <View>
//           <SegmentedControlIOS values={['One', 'Two', 'Three', 'Four', 'Five']} />
//         </View>
//       </View>
//     );
//   }
// }

//
// var SegmentedControlIOSExample = React.createClass({
//   render() {
//     return (
//       <View>
//         <View>
//           <SegmentedControlIOS tintColor={'#aaa'} values={['未使用', '已使用','已过期']} selectedIndex={1} />
//         </View>
//       </View>
//     );
//   }
// });
//
// var SegmentedControlIOSExample = React.createClass({
//   render() {
//     return (
//       <View>
//         <View>
//           <SegmentedControlIOS values={['One', 'Two']} momentary={true} />
//         </View>
//       </View>
//     );
//   }
// });
//
// var SegmentedControlIOSExample = React.createClass({
//   render() {
//     return (
//       <View>
//         <View>
//           <SegmentedControlIOS enabled={false} values={['One', 'Two']} selectedIndex={1} />
//         </View>
//       </View>
//     );
//   },
// });
//
// var SegmentedControlIOSExample = React.createClass({
//   render() {
//     return (
//       <View>
//         <View style={{marginBottom: 10}}>
//           <SegmentedControlIOS tintColor="#ff0000" values={['One', 'Two', 'Three', 'Four']} selectedIndex={0} />
//         </View>
//         <View>
//           <SegmentedControlIOS tintColor="#00ff00" values={['One', 'Two', 'Three']} selectedIndex={1} />
//         </View>
//       </View>
//     );
//   },
// });

var SegmentedControlIOSExample = React.createClass({
  getInitialState() {
    return {
      values: ['One', 'Two', 'Three'],
      value: 'Not selected',
      selectedIndex: undefined
    };
  },

  render() {
    return (
      <View>
        <Text style={styles.text} >
          Value: {this.state.value}
        </Text>
        <Text style={styles.text} >
          Index: {this.state.selectedIndex}
        </Text>
        <SegmentedControlIOS
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange} />
      </View>
    );
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  },

  _onValueChange(value) {
    console.log(value);
    this.setState({
      value: value,
    });
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});

exports.title = '<SegmentedControlIOS>';
exports.displayName = 'SegmentedControlExample';
exports.description = 'Native segmented control';
exports.examples = [
  {
    title: 'Segmented controls can have values',
    render(): ReactElement<any> { return <BasicSegmentedControlExample />; }
  },
  {
    title: 'Segmented controls can have a pre-selected value',
    render(): ReactElement<any> { return <PreSelectedSegmentedControlExample />; }
  },
  {
    title: 'Segmented controls can be momentary',
    render(): ReactElement<any> { return <MomentarySegmentedControlExample />; }
  },
  {
    title: 'Segmented controls can be disabled',
    render(): ReactElement<any> { return <DisabledSegmentedControlExample />; }
  },
  {
    title: 'Custom colors can be provided',
    render(): ReactElement<any> { return <ColorSegmentedControlExample />; }
  },
  {
    title: 'Change events can be detected',
    render(): ReactElement<any> { return <EventSegmentedControlExample />; }
  }
];


//
// class SegmentedControlIOSExample {
//   constructor() {
//
//   }
//   render: function() {
//     return (
//       <div />
//     );
//   }
// }
//
export default SegmentedControlIOSExample;
