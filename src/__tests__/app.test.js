import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../app';

it('adds an in-progress todo when pressing enter', () => {
  const {
    getByPlaceholderText,
    getByDisplayValue,
    container,
    getByTestId,
  } = render(<App />);

  const newItemInput = getByPlaceholderText('todo...');
  userEvent.type(newItemInput, 'buy milk');
  fireEvent.keyDown(newItemInput, { key: 'Enter', keyCode: 'Enter' });

  const addedItemInput = getByDisplayValue('buy milk');
  const checkBox = getByTestId(addedItemInput.dataset.itemId);
  expect(checkBox.checked).toBe(false);
});
