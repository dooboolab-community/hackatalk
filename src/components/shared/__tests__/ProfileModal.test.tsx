import { RenderResult, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';
import React from 'react';
import Shared from '../ProfileModal';

describe('[ProfileModal] rendering test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: React.ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Shared {...props} />);
    testingLib = render(component);
  });

  it('Render without crashing', async () => {
    const { baseElement } = testingLib;
    await wait(() => {
      expect(baseElement).toMatchSnapshot();
      expect(baseElement).toBeTruthy();
    });
  });
});
