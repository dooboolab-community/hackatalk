import * as React from 'react';

import StatusMessageView, {
  MAX_STATUS_MESSAGE_LINES,
} from '../StatusMessageView';
import {fireEvent, render} from '@testing-library/react-native';
import timeTravel, {setupTimeTravel} from '../../../../test/timeTravel';

import {Animated} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';

const props = {
  statusMessage: 'StatusMessage test',
  transitionOpacity: {
    current: new Animated.Value(0),
  },
  isStatusMessageExpanded: false,
  handleAnim: () => {},
  modalLayout: {
    width: 300,
    height: 300,
  },
  showFriendAddedMessage: false,
  addFriendInFlight: false,
};

describe('[StatusMessageView] render', () => {
  it('render without crashing', () => {
    const screen = render(<StatusMessageView {...props} />);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('render arrow-up when statusMessage has more than 2 lines and isStatusMessageExpanded is false', () => {
    props.statusMessage =
      'StatusMessage test\nStatusMessage test\nStatusMessage test';
    props.isStatusMessageExpanded = false;

    const {getByTestId} = render(<StatusMessageView {...props} />);
    const parent = getByTestId('touchable-statusMessageView');

    expect(typeof parent.children[0]).toBe('object');

    expect((parent.children[0] as ReactTestInstance).props.name).toBe(
      'chevron-up-light',
    );
  });

  it('render "..." when statusMessage has more than MAX_STATUS_MESSAGE_LINES lines and isStatusMessageExpanded is true', () => {
    props.statusMessage =
      'StatusMessage test\nStatusMessage test\nStatusMessage test';
    props.isStatusMessageExpanded = false;

    const {getByTestId} = render(<StatusMessageView {...props} />);
    const parent = getByTestId('touchable-statusMessageView');

    expect(typeof parent.children[0]).toBe('object');

    expect((parent.children[0] as ReactTestInstance).props.name).toBe(
      'chevron-up-light',
    );
  });

  it('render arrow-down when statusMessage has more than 2 lines and isStatusMessageExpanded is true', () => {
    props.statusMessage = 'StatusMessage test\n'.repeat(
      MAX_STATUS_MESSAGE_LINES,
    );

    props.isStatusMessageExpanded = true;

    const {getByTestId} = render(<StatusMessageView {...props} />);
    const textComponent = getByTestId('text-end');

    expect(textComponent.children[0]).toBe('...');
  });

  it('should call onTextLayout callback of the StyledTextstatusMessage and render arrow', () => {
    props.isStatusMessageExpanded = false;

    const {getByTestId} = render(<StatusMessageView {...props} />);

    const mainText = getByTestId('text-main');

    fireEvent(mainText, 'onTextLayout', {
      nativeEvent: {
        lines: [
          {
            width: 195,
          },
        ],
      },
    });

    const parent = getByTestId('touchable-statusMessageView');

    expect(typeof parent.children[0]).toBe('object');

    expect((parent.children[0] as ReactTestInstance).props.name).toBe(
      'chevron-up-light',
    );
  });

  it('should not call onTextLayout callback when message is ""', () => {
    props.statusMessage = '';

    const {getByTestId} = render(<StatusMessageView {...props} />);

    const mainText = getByTestId('text-main');

    fireEvent(mainText, 'onTextLayout', {
      nativeEvent: {
        lines: [],
      },
    });

    const parent = getByTestId('touchable-statusMessageView');

    expect(typeof parent.children[0]).toBe('object');

    expect((parent.children[0] as ReactTestInstance).props.children).toBe('');
  });

  it('should not render arrow when statusMessage is short', () => {
    props.isStatusMessageExpanded = false;
    props.statusMessage = "It's short";

    const {getByTestId} = render(<StatusMessageView {...props} />);

    const mainText = getByTestId('text-main');

    fireEvent(mainText, 'onTextLayout', {
      nativeEvent: {
        lines: [
          {
            width: 55,
          },
        ],
      },
    });

    const parent = getByTestId('touchable-statusMessageView');

    expect(typeof parent.children[0]).toBe('object');

    expect((parent.children[0] as ReactTestInstance).props.testID).toBe(
      'text-main',
    );
  });

  it('should call onLayout callback of the Animated.View container', async () => {
    beforeEach(setupTimeTravel);

    props.isStatusMessageExpanded = true;

    const {getByTestId} = render(<StatusMessageView {...props} />);

    const animatedContainer = getByTestId('view-animated');

    expect(animatedContainer.props.style.transform[0].translateY).toBe(140);

    fireEvent(animatedContainer, 'onLayout', {
      nativeEvent: {
        layout: {
          height: 100,
        },
      },
    });

    timeTravel(1500);

    expect(animatedContainer.props.style.transform[0].translateY).toBe(90);
  });

  it('should deal with when modalLayout prop is given as initial value', () => {
    props.modalLayout = {width: 0, height: 0};

    const {getByTestId} = render(<StatusMessageView {...props} />);

    const animatedContainer = getByTestId('view-animated');

    expect(animatedContainer.props.style.left).toBe(undefined);
    expect(animatedContainer.props.style.top).toBe(0);
  });
});
