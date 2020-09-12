import React, { ComponentType, ReactElement } from 'react';
import { getByTestId, render } from '@testing-library/react-native';

import ComponentWrapper from '../ComponentWrapper';
import { View } from 'react-native';

function createTestView(testId: string): ComponentType<{ children: ReactElement }> {
  return (props: { children?: ReactElement }): ReactElement => (
    <View testID={testId}>
      {props.children}
    </View>
  );
}

describe('ComponentWrapper', () => {
  it('Single level nesting is itself', () => {
    const Source = createTestView('source');
    const Wrapped = new ComponentWrapper(Source).build();
    const { getByTestId } = render(<Wrapped />);
    expect(getByTestId('source')).toBeTruthy();
  });

  it('Nest three', () => {
    const Innermost = createTestView('innermost');
    const Middle = createTestView('middle');
    const Outermost = createTestView('outermost');
    const Wrapped = new ComponentWrapper(Innermost)
      .wrap(Middle, {})
      .wrap(Outermost, {})
      .build();
    const { container } = render(<Wrapped />);
    const actualOutermost = getByTestId(container, 'outermost');
    const actualMiddle = getByTestId(actualOutermost, 'middle');
    const actualInnermost = getByTestId(actualMiddle, 'innermost');
    expect(actualOutermost).toBeTruthy();
    expect(actualMiddle).toBeTruthy();
    expect(actualInnermost).toBeTruthy();
  });
});
