import * as Device from 'expo-device';
import * as React from 'react';

import {Button, View} from 'react-native';
import {DeviceProvider, useDeviceContext} from '../DeviceProvider';
import {act, fireEvent, render} from '@testing-library/react-native';

const FakeChild = (): React.ReactElement => {
  const {setDeviceType} = useDeviceContext();

  return (
    <View>
      <Button
        testID="BUTTON"
        onPress={(): void => setDeviceType(Device.DeviceType.PHONE)}
        title="Button"
      />
    </View>
  );
};

describe('Rendering', () => {
  const component = (
    <DeviceProvider>
      <FakeChild />
    </DeviceProvider>
  );

  it('component and snapshot matches', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('Interactions', () => {
  it('should setUser', async () => {
    const {getByTestId} = render(
      <DeviceProvider>
        <FakeChild />
      </DeviceProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });

    // TODO: Check the result of press event.
  });
});
