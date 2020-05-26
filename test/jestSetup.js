import React from 'react';

/**
 * Temporarily test files that resolves https://github.com/facebook/react-native/issues/27721
 */

jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity.js', () => {
  const { Component } = require('react');
  const { View } = require('react-native');

  class MockTouchable extends Component {
    render() {
      return <View {...this.props} />;
    }
  }

  MockTouchable.displayName = 'TouchableOpacity';

  return MockTouchable;
});

jest.mock('react-native/Libraries/Components/Touchable/TouchableHighlight.js', () => {
  const { Component } = require('react');
  const { View } = require('react-native');

  class MockTouchable extends Component {
    render() {
      return <View {...this.props} />;
    }
  }

  MockTouchable.displayName = 'TouchableHighlight';

  return MockTouchable;
});
