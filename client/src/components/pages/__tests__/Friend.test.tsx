import {LoadingIndicator, ThemeProvider} from 'dooboo-ui';
import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import React, {Suspense} from 'react';
import {dark, light} from '../../../theme';

import Friend from '../Friend';
import {ProfileModalProvider} from '../../../providers/ProfileModalProvider';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {User} from '../../../types/graphql';
import {render} from '@testing-library/react-native';

const environment = createMockEnvironment();

const component = (
  <ThemeProvider>
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
  it('renders a friend', async () => {
    const {toJSON} = render(component);

    environment.mock.resolveMostRecentOperation((operation) => {
      return MockPayloadGenerator.generate(operation, {
        // @ts-ignore
        User: (_, generateId): User => ({
          id: `user-${generateId()}`,
          name: 'John Doe',
          nickname: 'jdoe1234',
        }),
        PageInfo: () => ({has_next_page: false}),
      });
    });

    // await waitFor(() => expect(getByText('John Doe')).toBeTruthy());

    const json = toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
