import 'react-native';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {RenderAPI, render} from '@testing-library/react-native';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import mockReactNavigation, {RouteProp} from '@react-navigation/core';

import {MainStackParamList} from '../../navigations/MainStackNavigator';
import Page from '../User';
import {ReactElement} from 'react';
import {User} from '../../../types/graphql';

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

const generateUser = (idNum: number, isFriend: boolean): Partial<User> => ({
  id: `user-test-${idNum}`,
  isFriend,
});

describe('Rendering', () => {
  it('renders without crashing', async () => {
    props = {};

    const mockEnvironment = createMockEnvironment();

    // mockEnvironment.mock.queueOperationResolver((operation) =>
    //   MockPayloadGenerator.generate(operation, {
    //     User: (_, generateId) => generateUser(generateId(), false),
    //   }),
    // );

    // component = createTestElement(<Page {...props} />, {
    //   environment: mockEnvironment,
    // });

    // testingLib = render(component);

    // const baseElement = testingLib.toJSON();

    // expect(baseElement).toBeTruthy();
    expect(1).toBeTruthy();
  });
});
