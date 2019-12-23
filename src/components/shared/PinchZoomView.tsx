import ImageViewer, {
  ImageViewerPropsDefine,
} from 'react-native-image-zoom-viewer';
import React, { ReactElement, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export interface ImageInfo extends IImageInfo {
  title: string;
  subtitle: string;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onPressClose?: () => void;
}

interface Props extends Omit<ImageViewerPropsDefine, 'imageUrls'> {
  imageInfos: ImageInfo[];
  onPressClose?: () => void;
}

const HeaderContainer = styled.SafeAreaView`
  position: absolute;
  width: 100%;
  height: 80;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: white;
  font-size: 20;
`;

const SubTitle = styled.Text`
  color: white;
  font-size: 16;
`;

const Header = ({
  title,
  subtitle,
  onPressClose,
}: HeaderProps): React.ReactElement => {
  return (
    <HeaderContainer>
      <View style={{ marginLeft: 30 }}>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </View>
      <TouchableOpacity style={{ marginRight: 30 }} onPress={onPressClose}>
        <Ionicons size={32} style={{ color: 'white' }} name="md-close" />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const Nothing = (): ReactElement => {
  return <></>;
};

/**
 * Example
 * ```
 * const images = [
 *   {
 *     url: 'IMAGE_URL',
 *     title: 'MyPuppy',
 *     subtitle: 'HelloMyPuppy',
 *   }
 * ]
 * ...
 *   <PinchZoomView images={images}/>
 * ```
 */
const PinchZoomView = ({
  imageInfos,
  onPressClose,
  ...props
}: Props): ReactElement<ImageViewer> => {
  const hasMultipleImages = useMemo(() => {
    return imageInfos.length > 1;
  }, imageInfos);

  const renderHeader = (index?: number): React.ReactElement => {
    return (
      <Header
        onPressClose={onPressClose}
        title={index ? imageInfos[index].title : undefined}
        subtitle={index !== undefined ? imageInfos[index].subtitle : undefined}
      />
    );
  };

  /**
   * Show props.renderIndicator or only show default indicator if it has multiple images
   */
  const renderIndicator =
    props.renderIndicator || (hasMultipleImages ? undefined : Nothing);

  return (
    <ImageViewer
      renderHeader={renderHeader}
      imageUrls={imageInfos}
      renderIndicator={renderIndicator}
      {...props}
    />
  );
};

export default PinchZoomView;
