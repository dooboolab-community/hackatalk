import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, act, fireEvent, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { MockPayloadGenerator } from 'relay-test-utils';
import Screen from '../VerifyEmail';
import { environment } from '../../../providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

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
  beforeEach(() => {
    props = createTestProps({
      route: {
        params: {
          email: 'test@email.com',
        },
      },
    });
    component = createTestElement(
      <Screen {...props} />,
    );
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeEach(() => {
    props = createTestProps({
      route: {
        params: {
          email: 'test@email.com',
        },
      },
    });
    component = createTestElement(
      <Screen {...props} />,
    );
    testingLib = render(component);
  });

  it('should simulate email button press', async () => {
    const btn = testingLib.queryByTestId('btn-next');
    act(() => {
      fireEvent.press(btn);
    });
    await act(() => wait());

    const operation = environment.mock.getMostRecentOperation();
    environment.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation),
    );
  });
});
