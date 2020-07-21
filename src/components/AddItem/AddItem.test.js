import React from 'react';
import { render as renderWithoutProvider } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { AppStateProvider } from 'context/app-state';
import TodoList from 'components/TodoList';

const render = renderWithoutProvider(AppStateProvider);

it('is automatically focused when app is loaded', () => {
  const { newItemInput } = render(<TodoList />);

  expect(newItemInput()).toHaveFocus();
});
