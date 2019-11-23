import { ImageProps, Modal, SafeAreaView } from 'react-native';
import ImageViewer, { ImageViewerPropsDefine } from 'react-native-image-zoom-viewer';
import React, { forwardRef } from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.SafeAreaView`
  position: absolute;
  z-index: 1;
  margin-left: 30;
  top: 30;
`;

const Title = styled.Text`
  color: white;
  font-size: 20;
`;

const SubTitle = styled.Text`
  color: white;
  font-size: 18;
`;

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps): React.ReactElement<HeaderProps, typeof SafeAreaView> => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </HeaderContainer>
  );
};

interface ImageI extends HeaderProps {
  url: string;
  width?: number;
  height?: number;
  props?: ImageProps;
}

interface Props extends Omit<ImageViewerPropsDefine, 'imageUrls'> {
  images: ImageI[];
}

/**
 * Example
 * ```
 *   <PinchZoomView />
 * ```
 */
const PinchZoomView = forwardRef<Modal, Props>(({ images, ...props }, ref) => {
  const renderHeader = (index?: number): React.ReactElement => {
    return (
      <Header
        title={index ? images[index].title : undefined}
        subtitle={index ? images[index].subtitle : undefined} />
    );
  };

  return (
    <Modal ref={ref}>
      <ImageViewer
        {...props}
        imageUrls={images}
        // imageUrls={images || [{ url: 'https://randomuser.me/api/portraits/women/33.jpg' }]}
        renderHeader={renderHeader}
      />
    </Modal>
  );
});

export default PinchZoomView;
