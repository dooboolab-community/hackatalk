import { ImageProps, SafeAreaView, TouchableOpacity, View } from 'react-native';
import ImageViewer, { ImageViewerPropsDefine } from 'react-native-image-zoom-viewer';
import React, { ReactElement } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export interface ImageI extends HeaderProps {
  url: string;
  width?: number;
  height?: number;
  props?: ImageProps;
}

interface Props extends Omit<ImageViewerPropsDefine, 'imageUrls'> {
  images: ImageI[];
  onPressClose?: () => void;
}

const HeaderContainer = styled.SafeAreaView`
  position: absolute;
  width: 100%;
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

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onPressClose?: () => void;
}

const Header = ({
  title, subtitle, onPressClose,
}: HeaderProps): React.ReactElement<HeaderProps, typeof SafeAreaView> => {
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
const PinchZoomView = ({ images, onPressClose, ...props }: Props): ReactElement<ImageViewer> => {
  const renderHeader = (index?: number): React.ReactElement => {
    return (
      <Header
        onPressClose={onPressClose}
        title={index !== undefined ? images[index].title : undefined}
        subtitle={index !== undefined ? images[index].subtitle : undefined}
      />

    );
  };

  return (
    <ImageViewer
      renderHeader={renderHeader}
      imageUrls={images}
      renderIndicator={props.renderIndicator || Nothing}
      {...props}
    />
  );
};

export default PinchZoomView;
