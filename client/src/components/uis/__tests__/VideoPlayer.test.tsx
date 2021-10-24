import 'react-native';

import * as React from 'react';

import {fireEvent, render, waitFor} from '@testing-library/react-native';

import VideoPlayer from '../VideoPlayer';
import {createTestElement} from '../../../../test/testUtils';
import {getString} from '../../../../STRINGS';

const props = {
  uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  setMediaError: jest.fn(),
};

describe('[VideoPlayer] render', () => {
  it('render without crashing', async () => {
    const screen = render(createTestElement(<VideoPlayer {...props} />));
    const json = screen.toJSON();

    await waitFor(() => {
      expect(json).toBeTruthy();
      expect(json).toMatchSnapshot();
    });
  });

  it('should display thumbnail error when uri was not provided', async () => {
    const newProps = {...props, uri: undefined};

    const {getByText} = render(
      createTestElement(<VideoPlayer {...newProps} />),
    );

    await waitFor(() => {
      expect(getByText(getString('THUMBNAIL_ERROR'))).toBeTruthy();
    });
  });

  it('should call onPlaybackStatusUpdate when loadAsync Resolved', async () => {
    const screen = render(createTestElement(<VideoPlayer {...props} />));

    await waitFor(async () => {
      const button = screen.getByText(
        getString('MEDIA_LOAD', {media: getString('VIDEO')}),
      );
      fireEvent.press(button);
    });

    // @ts-ignore
    expect(screen.toJSON().children[0].children[0]).toBe(
      'Video isLoaded? : true',
    );
  });

  it('should call onError when loadAsync rejected', async () => {
    const newProps = {...props, uri: undefined};

    const {getByText} = render(
      createTestElement(<VideoPlayer {...newProps} />),
    );

    await waitFor(() => {
      const button = getByText(
        getString('MEDIA_LOAD', {media: getString('VIDEO')}),
      );
      fireEvent.press(button);
    });

    expect(props.setMediaError).toBeCalled();
  });
});

describe('[VideoPlayer] web render', () => {
  it('render without crashing', async () => {
    jest.doMock('react-native/Libraries/Utilities/Platform', () => {
      return {OS: 'web'};
    });

    const {queryByText} = render(createTestElement(<VideoPlayer {...props} />));

    expect(
      queryByText(getString('MEDIA_LOAD', {media: getString('VIDEO')})),
    ).toBeNull();
  });
});
