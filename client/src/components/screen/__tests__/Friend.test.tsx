// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils';
import React, { Suspense } from 'react';
import { dark, light } from '../../../theme';
import { render, waitFor } from '@testing-library/react-native';

import Friend from '../Friend';
import { LoadingIndicator } from 'dooboo-ui';
import { ProfileModalProvider } from '../../../providers/ProfileModalProvider';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { ThemeProvider } from '@dooboo-ui/theme';
import { User } from '../../../types/graphql';

const environment = createMockEnvironment();

const component = (
  <ThemeProvider customTheme={{ light, dark }}>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<LoadingIndicator />}>
        <ProfileModalProvider>
          <Friend />
        </ProfileModalProvider>
      </Suspense>
    </RelayEnvironmentProvider>
  </ThemeProvider>
);

describe('[Friend] rendering test', () => {
  it('should render without crashing', async () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders a friend', async () => {
    environment.mock.queueOperationResolver((operation) => {
      return MockPayloadGenerator.generate(operation, {
        User: (_, generateId): User => ({
          id: `user-${generateId()}`,
          name: 'John Doe',
          nickname: 'jdoe1234',
        }),
      });
    });

    const { getByText } = render(component);

    return waitFor(() => expect(getByText('John Doe')).toBeTruthy());
  });

  it('re-renders upon friend update', async () => {
    const makeFriendResolver = (
      name: string,
    ): MockPayloadGenerator.MockResolvers => ({
      User: (_, generateId): User => ({
        id: `user-${generateId()}`,
        name,
      }),
    });

    const { getByText } = render(component);

    const operation = await waitFor(() => environment.mock.getMostRecentOperation());

    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(
        operation,
        makeFriendResolver('John Doe'),
      ),
    );

    await waitFor(() => expect(getByText('John Doe')).toBeTruthy());

    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(
        operation,
        makeFriendResolver('Sarah Doe'),
      ),
    );

    await waitFor(() => expect(getByText('Sarah Doe')).toBeTruthy());
  });
});
