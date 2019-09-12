import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @flow
import React, { Component } from 'react';

import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {}

function Screen(props: Props) {
  return (
    <StyledContainer>
      <Text>NotFound</Text>
    </StyledContainer>
  );
}

export default Screen;
