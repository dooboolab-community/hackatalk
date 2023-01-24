import {render, within} from '@testing-library/react-native';

import ComponentWrapper from '../ComponentWrapper';
import React from 'react';
import type {ReactElement} from 'react';
import {View} from 'react-native';

describe('ComponentWrapper', () => {
  it('Single level nesting is itself', () => {
    const Source = ({children}: {children?: ReactElement}): ReactElement => (
      <View testID="source">{children}</View>
    );

    const Wrapped = new ComponentWrapper(Source).build();
    const {getByTestId} = render(<Wrapped />);

    expect(getByTestId('source')).toBeTruthy();
  });

  it('Nest three', () => {
    const Innermost = ({children}: {children?: ReactElement}): ReactElement => (
      <View testID="innermost">{children}</View>
    );

    const Middle = ({children}: {children?: ReactElement}): ReactElement => (
      <View testID="middle">{children}</View>
    );

    const Outermost = ({children}: {children?: ReactElement}): ReactElement => (
      <View testID="outermost">{children}</View>
    );

    const Wrapped = new ComponentWrapper(Innermost)
      .wrap(Middle, {})
      .wrap(Outermost, {})
      .build();

    const {getByTestId} = render(<Wrapped />);
    const actualOutermost = getByTestId('outermost');
    const actualMiddle = within(actualOutermost).getByTestId('middle');
    const actualInnermost = within(actualMiddle).getByTestId('innermost');

    expect(actualOutermost).toBeTruthy();
    expect(actualMiddle).toBeTruthy();
    expect(actualInnermost).toBeTruthy();
  });
});
