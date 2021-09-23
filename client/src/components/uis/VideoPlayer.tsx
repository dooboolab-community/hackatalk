import {AVPlaybackStatus, Video} from 'expo-av';
import React, {FC, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {LoadingIndicator} from 'dooboo-ui';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getString} from '../../../STRINGS';

type Props = {
  // uri: string;
  loadAsyncVideo: () => Promise<AVPlaybackStatus | undefined>;
  setMediaError: (error: string) => void;
  videoRef: React.RefObject<Video> | null;
};

const VideoPlayer: FC<Props> = ({loadAsyncVideo, setMediaError, videoRef}) => {
  const [loadStarted, setLoadStarted] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatus>({isLoaded: false});

  const handleLoadPress = async (): Promise<void> => {
    console.log('loading start: ');
    try {
      setLoadStarted(true);
      await loadAsyncVideo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Video
        ref={videoRef}
        style={{
          alignSelf: 'center',
          width: 240,
          height: 150,
        }}
        useNativeControls
        resizeMode="contain"
        onError={() => {
          setMediaError(getString('FAILED_FETCH', {media: getString('VIDEO')}));
        }}
        onPlaybackStatusUpdate={(update: AVPlaybackStatus) => {
          console.log(update);
          setStatus(update);
        }}
      />
      {!loadStarted ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 240,
            height: 150,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100,
          }}
        >
          <TouchableOpacity
            onPress={handleLoadPress}
            style={{justifyContent: 'center', alignItems: 'center'}}
          >
            <Text>Load</Text>
          </TouchableOpacity>
        </View>
      ) : (
        !status.isLoaded && <LoadingIndicator />
      )}
    </View>
  );
};

export default VideoPlayer;
