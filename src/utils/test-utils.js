import React from 'react';
import { render, queries, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import * as customQueries from './custom-queries';
import { curry } from 'ramda';
import theme from '../theme';

const AllProviders = (AppStateProvider, initialState) => ({ children }) => (
  <AppStateProvider>
    <ThemeProvider theme={theme} initalState={initialState}>
      {children}
    </ThemeProvider>
  </AppStateProvider>
);

const addItem = async (renderResult, newItemInput, text = '') => {
  await userEvent.type(newItemInput, text, {
    // The delay is useful for catching focus loss, eg. due to erroneous rerendering
    delay: 1,
  });

  const input = renderResult.getByDisplayValue(text);
  const itemId = input.dataset.itemId;
  const itemContainer = () => renderResult.getByTestId(itemId);

  return {
    addedInput: () => getByLabelText(itemContainer(), 'Todo description'),
    itemId,
    itemContainer,
    toggleCheckbox() {
      return getByLabelText(itemContainer(), 'Toggle todo');
    },
  };
};

//define a custom render method, with wrapper provider
// TODO: Importing AppStateProvider directly results in context being undefined
const customRender = curry(
  (AppStateProvider, ui, options = {}, initialState) => {
    if (!ui) throw new Error('No component supplied');

    const renderResult = render(ui, {
      queries: {
        ...queries,
        ...customQueries,
      },
      wrapper: AllProviders(AppStateProvider, initialState),
      ...options,
    });
    return {
      ...renderResult,
      actions: {
        addItem: async (text) =>
          await addItem(renderResult, renderResult.newItemInput(), text),
      },
    };
  }
);

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
