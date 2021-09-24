import * as VideoThumbnails from 'expo-video-thumbnails';

import {AVPlaybackStatus, Video} from 'expo-av';
import {Image, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';

import {LoadingIndicator} from 'dooboo-ui';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';

type Props = {
  uri: string;
  // loadAsyncVideo: () => Promise<AVPlaybackStatus | undefined>;
  setMediaError: (error: string) => void;
  videoRef: React.RefObject<Video> | null;
};

const StyledVideoLoadText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.focused};
  background-color: 'rgba(255,255,255, 0.5)';
  padding: 2px 5px 2px 5px;
`;

const StyledLoadErrorText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.errorTitle};
  align-self: center;
`;

const StyledThumbnailWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 150px;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const VideoPlayer: FC<Props> = ({uri, setMediaError, videoRef}) => {
  const [loadStarted, setLoadStarted] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatus>({isLoaded: false});

  const [thumbnail, setThumbnail] =
    useState<VideoThumbnails.VideoThumbnailsResult | null>(null);

  const [thumbnailError, setThumbnailError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const result = await VideoThumbnails.getThumbnailAsync(uri, {
          time: 0,
          quality: 0.5,
        });
        setThumbnail(result);
      } catch (e) {
        setThumbnailError(getString('THUMBNAIL_ERROR'));
      }
    })();
  }, [uri]);

  const handleLoadPress = async (): Promise<void> => {
    const loadAsyncVideo = async (): Promise<AVPlaybackStatus | undefined> => {
      if (!videoRef) return;

      const load = await videoRef.current?.loadAsync(
        {uri},
        {
          progressUpdateIntervalMillis: 500,
          positionMillis: 0,
          shouldPlay: false,
          rate: 1.0,
          shouldCorrectPitch: false,
          volume: 1.0,
          isMuted: false,
          isLooping: false,
        },
      );

      return load;
    };

    setLoadStarted(true);
    await loadAsyncVideo();
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
          setStatus(update);
        }}
      />
      {!loadStarted ? (
        <StyledThumbnailWrapper>
          <TouchableOpacity
            onPress={handleLoadPress}
            style={{justifyContent: 'center', alignItems: 'center'}}
          >
            <>
              {!!thumbnail && (
                <Image
                  source={{uri: thumbnail.uri}}
                  style={{
                    width: 240,
                    height: 150,
                    position: 'absolute',
                    opacity: 0.7,
                  }}
                  resizeMode={'contain'}
                />
              )}
              <>
                <StyledVideoLoadText>
                  {getString('MEDIA_LOAD', {media: getString('VIDEO')})}
                </StyledVideoLoadText>
                {!!thumbnailError && (
                  <StyledLoadErrorText>{thumbnailError}</StyledLoadErrorText>
                )}
              </>
            </>
          </TouchableOpacity>
        </StyledThumbnailWrapper>
      ) : (
        !status.isLoaded && <LoadingIndicator />
      )}
    </View>
  );
};

export default VideoPlayer;
