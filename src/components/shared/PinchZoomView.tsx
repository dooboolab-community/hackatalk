import styled, { DefaultTheme, ThemeProps, withTheme } from 'styled-components/native';
import { ImageProps, Modal, View, Text, SafeAreaView } from 'react-native';
import ImageViewer, { ImageViewerPropsDefine } from 'react-native-image-zoom-viewer';
import React, { forwardRef } from 'react';

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
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps): React.ReactElement => {
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

interface Props extends ThemeProps<DefaultTheme>, Omit<ImageViewerPropsDefine, 'imageUrls'> {
  images: ImageI[];
}

const Shared = forwardRef<Modal, Props>(({ images, ...props }, ref) => {
  const renderHeader = (index?: number | undefined): React.ReactElement | undefined => {
    if (index === undefined) {
      return undefined;
    } else {
      return (
        <Header title={images[index].title} subtitle={images[index].subtitle} />
      );
    }
  };

  return (
    <Modal ref={ref}>
      <ImageViewer renderHeader={renderHeader} {...props} imageUrls={images || [{url: 'https://randomuser.me/api/portraits/women/33.jpg'}]}/>
    </Modal>
  );
});

export default Shared;
