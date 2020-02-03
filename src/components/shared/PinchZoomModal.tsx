import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactElement, useCallback, useState } from 'react';

import ImageZoom from 'react-native-image-pan-zoom';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  renderCloseElement: () => ReactElement;
  onClose?: () => void;
  images?: ImageSourcePropType[];
  indicatorTextStyle?: TextStyle;
  indicatorContainerStyle?: ViewStyle;
}

function PinchZoomModal(props: Props): ReactElement {
  const {
    images = [],
    renderCloseElement = (): ReactElement => <View/>,
    onClose,
    indicatorContainerStyle,
    indicatorTextStyle,
  } = props;
  const [visible, setVisible] = useState<boolean>(true);
  const [dimensionWidth, setDimensionWidth] = useState<number>(Dimensions.get('window').width);
  const [dimensionHeight, setDimensionHeight] = useState<number>(Dimensions.get('window').height);
  const [pageNum, setPageNum] = useState<number>(0);

  const renderImage = useCallback(() => (image: ImageSourcePropType, i: number): ReactElement => {
    return <View
      key={i}
      style={{
        width: dimensionWidth,
        height: dimensionHeight,
      }}
    >
      <View style={{ position: 'absolute' }}>
        <ImageZoom
          cropWidth={dimensionWidth}
          cropHeight={dimensionHeight}
          imageHeight={dimensionHeight}
          imageWidth={dimensionWidth}
        >
          <Image
            style={{ width: dimensionWidth, height: dimensionHeight }}
            source={image}
            resizeMode={'contain'}
          />
        </ImageZoom>
      </View>

    </View>;
  }, [images, dimensionWidth])();

  return <Modal
    onOrientationChange={(): void => {
      setDimensionWidth(Dimensions.get('window').width);
      setDimensionHeight(Dimensions.get('window').height);
    }}
    supportedOrientations={['portrait', 'landscape']}
    visible={visible} transparent={true}
  >
    <Container>
      <ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={16}
        onScroll={(e): void => {
          const contentOffset = e.nativeEvent.contentOffset;
          const viewSize = e.nativeEvent.layoutMeasurement;

          const newPage = Math.floor(contentOffset.x / viewSize.width);
          setPageNum(newPage);
        }}
      >
        {
          images.map((image, i) => renderImage(image, i))
        }
      </ScrollView>
      <View style={[
        {
          position: 'absolute',
          bottom: 80,
        },
        indicatorContainerStyle,
      ]}>
        <Text style={indicatorTextStyle}
        >{pageNum + 1} / {images.length}</Text>
      </View>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 48,
          right: 24,
        }}
      >
        <TouchableOpacity
          onPress={(): void => {
            setVisible(false);
            if (onClose) onClose();
          }}
        >
          {renderCloseElement()}
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  </Modal>;
}

export default PinchZoomModal;
