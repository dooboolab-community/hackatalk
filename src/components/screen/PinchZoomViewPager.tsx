import React, { ReactElement } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import PinchZoomModal from '../shared/PinchZoomModal';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

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

  return (
    <Container>
      <PinchZoomModal
        renderCloseElement={
          (): ReactElement =>
            <Ionicons name="md-close" size={24} color={theme.fontColor} />
        }
        onClose={goBack}
        images={images}
      />
    </Container>
  );
}

export default Page;
