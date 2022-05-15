import * as VideoThumbnails from 'expo-video-thumbnails';

import {AVPlaybackStatus, ResizeMode, Video} from 'expo-av';
import {Image, Platform, Share, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';

import {LoadingIndicator} from 'dooboo-ui';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';

type Props = {
  uri: string;
  setMediaError: (error: string) => void;
};

const StyledVideoLoadText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.primary};
  background-color: 'rgba(255,255,255, 0.5)';
  padding: 2px 5px 2px 5px;
`;

const StyledLoadErrorText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.danger};
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

const VideoPlayer: FC<Props> = ({uri, setMediaError}) => {
  const videoRef = useRef<Video | null>(null);

  const [loadStarted, setLoadStarted] = useState(false);

  const [status, setStatus] = useState<AVPlaybackStatus>({
    isLoaded: false,
  });

  const [thumbnail, setThumbnail] =
    useState<VideoThumbnails.VideoThumbnailsResult | null>(null);

  const [thumbnailError, setThumbnailError] = useState('');

  useEffect(() => {
    if (Platform.OS !== 'web') {
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
    }
  }, [uri]);

  const handlePress = async (): Promise<void> => {
    setLoadStarted(true);

    await videoRef.current?.loadAsync(
      {uri},
      {
        progressUpdateIntervalMillis: 500,
        positionMillis: 0,
        shouldPlay: true,
        rate: 1.0,
        shouldCorrectPitch: false,
        volume: 1.0,
        isMuted: false,
        isLooping: false,
      },
    );
  };

  const handleLongPress = async (): Promise<void> => {
    await Share.share({
      title: getString('SHARE_VIDEO'),
      message: getString('SHARING_VIDEO'),
      url: uri,
    });
  };

  return (
    <View>
      <Video
        ref={videoRef}
        style={{
          width: 240,
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onError={() => {
          setMediaError(getString('FAILED_FETCH', {media: getString('VIDEO')}));
        }}
        onPlaybackStatusUpdate={(update: AVPlaybackStatus) => {
          setStatus(update);
        }}
        {...(Platform.OS === 'web' && {source: {uri}})}
      />
      {Platform.OS !== 'web' &&
        (!loadStarted ? (
          <StyledThumbnailWrapper>
            <TouchableOpacity
              onPress={handlePress}
              onLongPress={handleLongPress}
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            >
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
              <StyledVideoLoadText>
                {getString('MEDIA_LOAD', {media: getString('VIDEO')})}
              </StyledVideoLoadText>
              {!!thumbnailError && (
                <StyledLoadErrorText>{thumbnailError}</StyledLoadErrorText>
              )}
            </TouchableOpacity>
          </StyledThumbnailWrapper>
        ) : !status.isLoaded ? (
          <LoadingIndicator />
        ) : null)}
    </View>
  );
};

export default VideoPlayer;
