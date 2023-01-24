import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import React, {Suspense} from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {graphql, useLazyLoadQuery} from 'react-relay';

import MessageListItem from '../MessageListItem';
import type {MessageListItemTestQuery} from '../../../__generated__/MessageListItemTestQuery.graphql';
import type {ProfileModal_user$key} from '../../../__generated__/ProfileModal_user.graphql';
import {Text} from 'react-native';
import {createTestElement} from '../../../../test/testUtils';
import {getString} from '../../../../STRINGS';

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
  userId?: string;
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

  if (!myData) {
    return <Text>FAILED TO FETCH</Text>;
  }

  return (
    <Suspense fallback={<Text>TEST FALLBACK</Text>}>
      <MessageListItem
        {...props}
        testID="chat-list-item0"
        item={myData}
        prevItemSender={{
          id: 'previous-message-id',
        }}
        nextItemDate="2021-03-19T00:57:16.762Z"
        userId={props.userId}
      />
    </Suspense>
  );
};

let mockEnvironment: any;

describe('[MessageListItem] rendering test', () => {
  beforeAll(() => {
    mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation: any) =>
      MockPayloadGenerator.generate(operation, {
        Message(_, generateId) {
          return {
            ...SAMPLE_MESSAGE,
            id: `test-message-${generateId()}`,
          };
        },
      }),
    );
  });

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

  it('should render message text as expected', async () => {
    const component = createTestElement(<QueryWrapper />, {
      environment: mockEnvironment,
    });

    const screen = render(component);
    const messageTexts = screen.queryAllByText(SAMPLE_MESSAGE.text);

    expect(messageTexts).not.toBeNull();
  });
});

describe('[MessageListItem] interaction', () => {
  beforeAll(() => {
    mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation: any) =>
      MockPayloadGenerator.generate(operation, {
        Message(_, generateId) {
          return {
            ...SAMPLE_MESSAGE,
            id: `test-message-${generateId()}`,
          };
        },
      }),
    );
  });

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

describe('[MessageListItem] image test', () => {
  beforeAll(() => {
    mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation: any) =>
      MockPayloadGenerator.generate(operation, {
        Message(_, generateId) {
          return {
            ...SAMPLE_MESSAGE,
            messageType: 'photo',
            id: `test-message-${generateId()}`,
          };
        },
      }),
    );
  });

  it('should render mediaError when failed loading', async () => {
    const component = createTestElement(<QueryWrapper />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const imgComponent = screen.getByTestId('image-display');
    fireEvent(imgComponent, 'error');

    const mediaErrorText = screen.queryAllByText(
      getString('FAILED_FETCH', {media: getString('PHOTO')}),
    );

    expect(mediaErrorText).not.toBeNull();
  });
});

describe('[MessageListItem] video test', () => {
  beforeAll(() => {
    mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation: any) =>
      MockPayloadGenerator.generate(operation, {
        Message(_, generateId) {
          return {
            ...SAMPLE_MESSAGE,
            messageType: 'file',
            id: `test-message-${generateId()}`,
          };
        },
      }),
    );
  });

  it('should render load media button at first', async () => {
    const component = createTestElement(
      <QueryWrapper userId={SAMPLE_MESSAGE.sender.id} />,
      {
        environment: mockEnvironment,
      },
    );

    const screen = render(component);

    await waitFor(() => {
      const mediaLoadText = screen.queryAllByText(
        getString('MEDIA_LOAD', {media: getString('VIDEO')}),
      );
      expect(mediaLoadText).not.toBeNull();
    });
  });
});
