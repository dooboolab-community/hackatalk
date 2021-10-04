import {AVPlaybackStatus, VideoProps} from 'expo-av';

import React from 'react';

const resolvedStatus = {
  uri: 'https://i.picsum.photos/id/344/200/300.jpg?hmac=hFZM-uJoRMyNATe_kjGvS2NGGP60jqqP64vpGQ98VAo',
  isLoaded: true,
  progressUpdateIntervalMillis: 500,
  positionMillis: 0,
  shouldPlay: true,
  isPlaying: false,
  isBuffering: false,
  rate: 0,
  shouldCorrectPitch: false,
  volume: 1,
  isMuted: false,
  isLooping: false,
  didJustFinish: false,
};
export class Video extends React.Component<VideoProps, any> {
  constructor(props: VideoProps) {
    super(props);
    this.state = {status: {isLoaded: false}};
  }

  loadAsync = jest.fn((source: {uri: string}): Promise<AVPlaybackStatus> => {
    return new Promise((resolve, reject) => {
      if (source.uri) {
        this.props.onPlaybackStatusUpdate(resolvedStatus);
        this.setState({status: resolvedStatus});
        resolve(resolvedStatus);
      } else {
        this.props.onError('no uri');
        this.setState({status: {isLoaded: false, error: 'no uri'}});
        reject({isLoaded: false, error: 'no uri'});
      }
    });
  });

  unloadAsync = jest.fn(() => 'string');

  render = jest.fn(() => {
    return `Video isLoaded? : ${this.state.status.isLoaded}`;
  });
}
