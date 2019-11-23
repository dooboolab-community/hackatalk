import { ImageProps, Modal, SafeAreaView } from 'react-native';
import ImageViewer, { ImageViewerPropsDefine } from 'react-native-image-zoom-viewer';
import React, { forwardRef } from 'react';
import styled from 'styled-components/native';

export interface ImageI extends HeaderProps {
  url: string;
  width?: number;
  height?: number;
  props?: ImageProps;
}

interface Props extends Omit<ImageViewerPropsDefine, 'imageUrls'> {
  images: ImageI[];
  visible?: boolean;
}

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
 *   <PinchZoomView visible images={images}/>
 * ```
 */
const PinchZoomView = forwardRef<Modal, Props>(({ images, ...props }, ref) => {
  const renderHeader = (index?: number): React.ReactElement => {
    return (
      <Header
        title={index !== undefined ? images[index].title : undefined}
        subtitle={index !== undefined ? images[index].subtitle : undefined} />
    );
  };

  return (
    <Modal ref={ref} visible={props.visible}>
      <ImageViewer
        {...props}

        imageUrls={images}
        renderHeader={renderHeader}
      />
    </Modal>
  );
});

export default PinchZoomView;
