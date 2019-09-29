import * as React from 'react';

import { Text, View } from 'react-native';

import { StateProvider } from '..';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props = {
  navigation: {
    navigate: jest.fn(),
  },
};

describe('[AppProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component = (
    <StateProvider>
      <View>
        <Text>Placeholding Children</Text>
      </View>
    </StateProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[StateProvider] interactions', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  const component = (
    <StateProvider>
      <View>
        <Text>Placeholding Children</Text>
      </View>
    </StateProvider>
  );

  const user = {
    displayName: 'dooboolab',
    age: 30,
    job: '',
  };

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    rendered = renderer.create(component);
    root = rendered.root;
  });

  // it('should trigger [resetUser] action', () => {
  //   let instance = root.instance;
  //   instance.actions.resetUser();
  // });

  // it('should check trigger actions when method called', () => {
  //   let instance = root.instance;
  //   instance.actions.setUser({
  //     displayName: '',
  //     age: 0,
  //     job: '',
  //   });
  // });
});
