import React, { ReactElement, useState } from 'react';
import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import PinchZoomSliderModal from '@dooboo-ui/pinch-zoom-slider-modal';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: MainStackNavigationProps<'PinchZoomViewPager'>;
}

const images = [
  // IC_LOGO,
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
];

function Page(props: Props): ReactElement {
  const { theme } = useThemeContext();
  const { navigation: { goBack } } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);

  return (
    <Container>
      <PinchZoomSliderModal
        renderCloseElement={
          (): ReactElement =>
            <Ionicons name="md-close" size={24} color={theme.fontColor} />
        }
        images={images}
        visible={visible}
        onClose={(): void => {
          setVisible(false);
          goBack();
        }}
        onPageChanged={(page: number): void => setPageNum(page)}
        renderIndicator={(): ReactElement => <View style={[
          {
            position: 'absolute',
            bottom: 80,
          },
        ]}>
          <Text>{pageNum + 1} / {images.length}</Text>
        </View>}
      />
    </Container>
  );
}

export default Page;
