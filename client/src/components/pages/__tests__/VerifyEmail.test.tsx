import 'react-native';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {act, fireEvent, render} from '@testing-library/react-native';

import React from 'react';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {ThemeProvider} from 'dooboo-ui';
import VerifyEmail from '../VerifyEmail';
import {createTestProps} from '../../../../test/testUtils';

const environment = createMockEnvironment();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = createTestProps({
  route: {
    params: {
      email: 'test@email.com',
    },
  },
});

const component = (
  <RelayEnvironmentProvider environment={environment}>
    <ThemeProvider>
      <VerifyEmail {...props} />
    </ThemeProvider>
  </RelayEnvironmentProvider>
);

// const mockSendVerification = [
//   {
//     request: {
//       query: MUTATION_SEND_VERIFICATION,
//       variables: {
//         email: 'test@email.com',
//       },
//     },
//     result: {
//       data: {
//         sendVerification: true,
//       },
//     },
//   },
// ];

describe('Rendering', () => {
  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('Interaction', () => {
  it('should simulate email button press', async () => {
    const {getByTestId} = render(component);
    const btn = getByTestId('btn-next');

    await act(() => {
      fireEvent.press(btn);
    });

    const operation = environment.mock.getMostRecentOperation();

    expect(operation).toBeTruthy();

    environment.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation),
    );
  });
});
