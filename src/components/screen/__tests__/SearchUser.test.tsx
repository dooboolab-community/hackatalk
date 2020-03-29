import { QUERY_FRIENDS, QUERY_USERS } from '../../../graphql/queries';
import React, { ReactElement } from 'react';
import { RenderResult, act, cleanup, fireEvent, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { MockedProvider } from '@apollo/react-testing';
import SearchUser from '../SearchUser';

const mocks = [
  {
    request: {
      query: QUERY_USERS,
    },
    result: {
      data: {
        users: {
          totalCount: 1,
          edges: [
            {
              node: {
                id: '3fd05630-4b4b-11ea-b8e6-57b0ff231f9b',
                email: 'dev.ted.kim@gmail.com',
                name: 'Ted Kim',
                nickname: null,
              },
              cursor: '1581259715000',
            },
            {
              node: {
                id: '135f79b0-5545-11ea-9ea9-ad4e7fcc8ca2',
                email: 'parkopp@gmail.com',
                name: 'geoseong',
                nickname: 'geoseong',
              },
              cursor: '1582356575000',
            },
          ],
          pageInfo: {
            startCursor: '1581259715000',
            endCursor: '1582356575000',
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      },
    },
  },
];

describe('[SearchUser] rendering test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders as expected', () => {
    const component = createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchUser {...props} />
      </MockedProvider>,
    );

    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders loading', () => {
    const component = createTestElement(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchUser {...props} />
      </MockedProvider>,
    );

    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders error view', () => {
    const errorMock = {
      request: { query: QUERY_USERS },
      error: new Error('error'),
    };

    const component = createTestElement(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <SearchUser {...props} />
      </MockedProvider>,
    );

    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('[SearchUser] interaction', () => {
  jest.useFakeTimers();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let testingLib: RenderResult;
  let component: ReactElement;
  beforeAll(() => {
    component = createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchUser {...props} />
      </MockedProvider>,
    );
    testingLib = render(component);
  });
  it('change text in SearchTextInput', async () => {
    const searchTextInput = testingLib.getByTestId('text-input');
    expect(searchTextInput).toBeTruthy();
    const searchText = 'geoseong';
    act(() => {
      fireEvent.changeText(searchTextInput, searchText);
    });
    expect(searchTextInput.props.value).toEqual(searchText);
  });
});
