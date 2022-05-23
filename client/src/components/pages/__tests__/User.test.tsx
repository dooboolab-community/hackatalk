import 'react-native';

import {RenderAPI, render} from '@testing-library/react-native';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import mockReactNavigation, {RouteProp} from '@react-navigation/core';

import {MainStackParamList} from '../../navigations/MainStackNavigator';
import Page from '../User';
import {ReactElement} from 'react';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

const mockNavigation = createMockNavigation();

const mockRoute: RouteProp<MainStackParamList, 'User'> = {
  key: '',
  name: 'User',
  params: {
    id: 'id1234',
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

describe('Rendering', () => {
  beforeEach(() => {
    props = {};
    component = createTestElement(<Page {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });
});
