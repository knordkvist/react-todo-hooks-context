import React from 'react';
import { render, queries } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import * as customQueries from './custom-queries';
import theme from '../theme';

// TODO: Importing AppStateProvider directly results in context being undefined
const AllProviders = (AppStateProvider, initialState) => ({ children }) => (
  <AppStateProvider>
    <ThemeProvider theme={theme} initalState={initialState}>
      {children}
    </ThemeProvider>
  </AppStateProvider>
);

//define a custom render method, with wrapper provider
const customRender = (ui, AppStateProvider, options = {}, initialState) => {
  return render(ui, {
    queries: {
      ...queries,
      ...customQueries,
    },
    wrapper: AllProviders(AppStateProvider, initialState),
    ...options,
  });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
