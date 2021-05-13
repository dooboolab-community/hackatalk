import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import React, {Suspense} from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {graphql, useLazyLoadQuery} from 'react-relay';

import MessageListItem from '../MessageListItem';
import {MessageListItemTestQuery} from '../../../__generated__/MessageListItemTestQuery.graphql';
import {ProfileModal_user$key} from '../../../__generated__/ProfileModal_user.graphql';
import {Text} from 'react-native';
import {createTestElement} from '../../../../test/testUtils';

const SAMPLE_MESSAGE = {
  messageType: 'text',
  text: 'Hello there!',
  createdAt: '2021-03-19T01:11:48.518Z',
  sender: {
    id: 'test-user-111',
    name: 'Alice',
    nickname: 'alice',
    photoURL: 'https://example.com/large.jpg',
    thumbURL: 'https://example.com/profile.jpg',
    hasBlocked: false,
    statusMessage: 'Hello WOrld!',
  },
};

type QueryWrapperProps = {
  onPressPeerImage?: (sender: ProfileModal_user$key) => void;
  onPressMessageImage?: (index: number) => void;
};

const QueryWrapper: React.FC<QueryWrapperProps> = (props) => {
  const {myData} = useLazyLoadQuery<MessageListItemTestQuery>(
    graphql`
      query MessageListItemTestQuery {
        myData: message(id: "test-id") {
          ...MessageListItem_message
        }
      }
    `,
    {},
  );

  if (!myData) return <Text>FAILED TO FETCH</Text>;

  return (
    <Suspense fallback={<Text>TEST FALLBACK</Text>}>
      <MessageListItem
        {...props}
        testID="chat-list-item0"
        item={myData}
        prevItemSenderId="previous-message-id"
        nextItemDate="2021-03-19T00:57:16.762Z"
      />
    </Suspense>
  );
};

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation, {
    Message(_, generateId) {
      return {
        ...SAMPLE_MESSAGE,
        id: `test-message-${generateId()}`,
      };
    },
  }),
);

describe('[MessageListItem] rendering test', () => {
  it('renders [peerMessage] as expected', async () => {
    const component = createTestElement(<QueryWrapper />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    // Wait until query is resolved.
    await waitFor(() => {
      expect(screen.queryByText('TEST FALLBACK')).toBeNull();
    });

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders [peerMessage] with URL as expected', async () => {
    const component = createTestElement(<QueryWrapper />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const senderImage = await screen.findByHintText('sender image');

    expect(senderImage.props.source.uri).toBe(
      'https://example.com/profile.jpg',
    );
  });
});

describe('[MessageListItem] interaction', () => {
  it('should fireEvent when peer image is pressed', async () => {
    const mockPressPeerImage = jest.fn();

    const component = createTestElement(
      <QueryWrapper onPressPeerImage={mockPressPeerImage} />,
      {
        environment: mockEnvironment,
      },
    );

    const screen = render(component);
    const touchPeerImage = screen.getByTestId('chat-list-item0');

    fireEvent.press(touchPeerImage);
    expect(mockPressPeerImage).toHaveBeenCalledTimes(1);
  });
});
