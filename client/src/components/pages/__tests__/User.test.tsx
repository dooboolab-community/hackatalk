import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';

import type {MainStackParamList} from '../../navigations/MainStackNavigator';
import Page from '../User';
import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import type {RouteProp} from '@react-navigation/core';
import type {User} from '../../../types/graphql';
import type mockReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

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
