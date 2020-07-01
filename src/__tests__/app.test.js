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
  const completedItemsContainer = getByTestId('completed-items-container');
  const activeItemsContainer = getByTestId('active-items-container');
  const addItem = (text) => {
    const newItemInput = getNewItemInput();
    userEvent.type(newItemInput, text);
    fireEvent.keyDown(newItemInput, { key: 'Enter', keyCode: 'Enter' });

    const addedElement = getByDisplayValue(text);
    const itemId = addedElement.dataset.itemId;
    const addedCheckBox = getByTestId(itemId);

    return {
      addedElement,
      itemId,
      addedCheckBox,
    };
  };

  return {
    ...renderResult,
    getNewItemInput,
    addItem,
    completedItemsContainer,
    activeItemsContainer,
  };
}

it('adds an active todo when pressing enter', () => {
  const { addItem } = renderUtil();

  const { addedCheckBox } = addItem('buy milk');

  expect(addedCheckBox.checked).toBe(false);
});

it('automatically focuses the new item input', () => {
  const { getNewItemInput } = renderUtil();

  expect(getNewItemInput()).toHaveFocus();
});

it('can complete active items', () => {
  const { addItem, completedItemsContainer } = renderUtil();
  const text = 'do thing';

  const { addedCheckBox, itemId } = addItem(text);
  fireEvent.click(addedCheckBox);

  // Make sure input and checkbox has moved to the 'completed items' section
  const checkBox = getByTestIdUnbound(completedItemsContainer, itemId);
  const input = getByDisplayValueUnbound(completedItemsContainer, text);
  expect(checkBox.checked).toBe(true);
  expect(input).toBeDefined();
});

it('can uncheck completed items', () => {
  const {
    addItem,
    completedItemsContainer,
    activeItemsContainer,
  } = renderUtil();
  const text = 'something fun';

  const { addedCheckBox, itemId } = addItem(text);
  fireEvent.click(addedCheckBox);
  const completedCheckBox = getByTestIdUnbound(completedItemsContainer, itemId);
  fireEvent.click(completedCheckBox);

  const uncheckedCheckBox = getByTestIdUnbound(activeItemsContainer, itemId);
  expect(uncheckedCheckBox.checked).toBe(false);
  expect(getByDisplayValueUnbound(activeItemsContainer, text));
});
