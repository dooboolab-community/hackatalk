import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';

import { StateProvider } from '../src/contexts';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../src/types';
import { createTheme } from '../src/theme';

const AllTheProviders = ({ children }): ReactElement => {
  return (
    <StateProvider>
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        {children}
      </ThemeProvider>
    </StateProvider>
  );
};

const customRender = (ui, options?): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
