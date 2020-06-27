import React from 'react';
import {
  render,
  fireEvent,
  getByTestId as getByTestIdUnbound,
  getByDisplayValue as getByDisplayValueUnbound,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../app';

function renderUtil() {
  const renderResult = render(<App />);
  const { getByDisplayValue, getByTestId } = renderResult;

  const getNewItemInput = () => renderResult.getByPlaceholderText('todo...');
  const addItem = (text) => {
    const newItemInput = getNewItemInput();
    userEvent.type(newItemInput, text);
    fireEvent.keyDown(newItemInput, { key: 'Enter', keyCode: 'Enter' });

    const addedElement = getByDisplayValue(text);
    const addedCheckBox = getByTestId(addedElement.dataset.itemId);
    return { addedElement, itemId: addedElement.dataset.itemId, addedCheckBox };
  };

  return { ...renderResult, getNewItemInput, addItem };
}

it('adds an active todo when pressing enter', () => {
  const { addItem } = renderUtil(<App />);

  const { addedCheckBox } = addItem('buy milk');

  expect(addedCheckBox.checked).toBe(false);
});

it('automatically focuses the new item input', () => {
  const { getNewItemInput } = renderUtil(<App />);

  expect(getNewItemInput()).toHaveFocus();
});

it('can complete active items', () => {
  const { addItem, getByTestId } = renderUtil(<App />);
  const text = 'do thing';

  const { addedCheckBox, itemId } = addItem(text);
  fireEvent.click(addedCheckBox);

  const completedItemsContainer = getByTestId('completed-items-container');
  // Make sure input and checkbox has moved to the 'completed items' section
  const checkBox = getByTestIdUnbound(completedItemsContainer, itemId);
  const input = getByDisplayValueUnbound(completedItemsContainer, text);
  expect(checkBox.checked).toBe(true);
});
