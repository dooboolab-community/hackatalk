import {Animated, Dimensions, ImageStyle} from 'react-native';
import {
  RootStackNavigationProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';
import {RouteProp, useNavigation} from '@react-navigation/native';

import ImageSliderTemp from '../templates/ImageSliderTemp';
import {PinchZoomRef} from '../UI/atoms/PinchZoom';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  navigation: RootStackNavigationProps<'ImageSlider'>;
  route: RouteProp<RootStackParamList, 'ImageSlider'>;
}

function ImageSliderContainer({
  route: {
    params: {images, initialIndex = 0},
  },
}: Props): React.ReactElement {
  const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex);
  const insets = useSafeAreaInsets();
  const imageContainerWidth = Dimensions.get('screen').width;

  const imageContainerHeight: number =
    Dimensions.get('screen').height - insets.top - insets.bottom;

  const imageStyle: ImageStyle = {
    width: imageContainerWidth,
    bottom: 0,
    height: imageContainerHeight,
  };

  const imageGap: number = 10;

  const animValues = React.useRef({
    scale: 1,
    x: 0,
    y: 0,
    nextTranslateX: 0,
    prevTranslateX: 0,
  }).current;

  const pinchZoomRef = React.useRef<PinchZoomRef>(null);
  const nextImageTranslateX = React.useRef(new Animated.Value(0)).current;
  const prevImageTranslateX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const translateOtherImages = React.useCallback(() => {
    animValues.nextTranslateX =
      ((animValues.scale - 1) * imageContainerWidth) / 2 + animValues.x;

    animValues.prevTranslateX =
      ((1 - animValues.scale) * imageContainerWidth) / 2 + animValues.x;

    nextImageTranslateX.setValue(animValues.nextTranslateX);
    prevImageTranslateX.setValue(animValues.prevTranslateX);
  }, [
    imageContainerWidth,
    animValues,
    nextImageTranslateX,
    prevImageTranslateX,
  ]);

  const onRelease = React.useCallback(() => {
    const moveNext = animValues.nextTranslateX < -imageContainerWidth / 2;
    const movePrev = animValues.prevTranslateX > imageContainerWidth / 2;
    const targetTranslate = pinchZoomRef.current?.animatedValue.translate;

    if (moveNext && currentIndex < images.length - 1 && targetTranslate)
      Animated.timing(targetTranslate, {
        toValue: {
          x: (-(animValues.scale + 1) / 2) * imageContainerWidth,
          y: animValues.y,
        },
        useNativeDriver: true,
        duration: 300,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
      });
    else if (movePrev && currentIndex > 0 && targetTranslate)
      Animated.timing(targetTranslate, {
        toValue: {
          x: ((animValues.scale + 1) / 2) * imageContainerWidth,
          y: animValues.y,
        },
        useNativeDriver: true,
        duration: 300,
      }).start(() => {
        nextImageTranslateX.setValue(0);
        prevImageTranslateX.setValue(0);
        setCurrentIndex(currentIndex - 1);
      });
    else if (animValues.nextTranslateX < 0 && targetTranslate)
      Animated.timing(targetTranslate, {
        toValue: {
          x: ((1 - animValues.scale) * imageContainerWidth) / 2,
          y: animValues.y,
        },
        useNativeDriver: true,
        duration: 300,
      }).start(() => {
        pinchZoomRef.current?.setValues({
          translate: {
            x: ((1 - animValues.scale) * imageContainerWidth) / 2,
            y: animValues.y,
          },
        });
      });
    else if (animValues.prevTranslateX > 0 && targetTranslate)
      Animated.timing(targetTranslate, {
        toValue: {
          x: ((animValues.scale - 1) * imageContainerWidth) / 2,
          y: animValues.y,
        },
        useNativeDriver: true,
        duration: 300,
      }).start(() => {
        pinchZoomRef.current?.setValues({
          translate: {
            x: ((animValues.scale - 1) * imageContainerWidth) / 2,
            y: animValues.y,
          },
        });
      });
  }, [
    currentIndex,
    imageContainerWidth,
    animValues.nextTranslateX,
    animValues.prevTranslateX,
    animValues.scale,
    animValues.y,
    images.length,
    nextImageTranslateX,
    prevImageTranslateX,
  ]);

  React.useEffect(() => {
    navigation.setOptions({
      headerBackTitle: images[currentIndex]?.sender || '',
    });

    pinchZoomRef.current?.setValues({scale: 1, translate: {x: 0, y: 0}});
    nextImageTranslateX.setValue(0);
    prevImageTranslateX.setValue(0);
  }, [
    currentIndex,
    images,
    navigation,
    nextImageTranslateX,
    prevImageTranslateX,
  ]);

  return (
    <ImageSliderTemp
      currentIndex={currentIndex}
      imageContainerWidth={imageContainerWidth}
      imageGap={imageGap}
      imageStyle={imageStyle}
      images={images}
      onRelease={onRelease}
      pinchZoomRef={pinchZoomRef}
      onScaleChanged={(value): void => {
        animValues.scale = value;
        translateOtherImages();
      }}
      onTranslateChanged={(value): void => {
        animValues.x = value.x;
        animValues.y = value.y;
        translateOtherImages();
      }}
    />
  );
}

export default ImageSliderContainer;
