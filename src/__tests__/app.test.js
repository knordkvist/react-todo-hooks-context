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

  const newItemInput = renderResult.getByPlaceholderText('todo...');
  const completedItemsContainer = getByTestId('completed-items-container');
  const activeItemsContainer = getByTestId('active-items-container');
  const addItem = async (text = '') => {
    // The delay is useful for catching focus loss due to rerendering
    await userEvent.type(newItemInput, text, { delay: 1 });
    fireEvent.keyDown(newItemInput, { key: 'Enter', keyCode: 'Enter' });

    const addedInput = getByDisplayValue(text);
    const itemId = addedInput.dataset.itemId;
    const addedCheckBox = getByTestId(itemId);

    return {
      addedInput,
      itemId,
      addedCheckBox,
    };
  };

  return {
    ...renderResult,
    newItemInput,
    addItem,
    completedItemsContainer,
    activeItemsContainer,
  };
}

it('adds an active todo when pressing enter', async () => {
  const { addItem } = renderUtil();
  const text = 'buy milk';
  const { addedCheckBox, addedInput } = await addItem(text);

  expect(addedCheckBox.checked).toBe(false);
  expect(addedInput.value).toBe(text);
});

it('clears the new item input after adding a new item', async () => {
  const { addItem, newItemInput } = renderUtil();
  await addItem('a new item!');

  expect(newItemInput.value).toBe('');
});

it('automatically focuses the new item input', () => {
  const { newItemInput } = renderUtil();

  expect(newItemInput).toHaveFocus();
});

it('can complete active items', async () => {
  const { addItem, completedItemsContainer } = renderUtil();
  const text = 'do thing';

  const { addedCheckBox, itemId } = await addItem(text);
  fireEvent.click(addedCheckBox);

  // Make sure input and checkbox has moved to the 'completed items' section
  const checkBox = getByTestIdUnbound(completedItemsContainer, itemId);
  const input = getByDisplayValueUnbound(completedItemsContainer, text);
  expect(checkBox.checked).toBe(true);
  expect(input).toBeDefined();
});

it('can uncheck completed items', async () => {
  const {
    addItem,
    completedItemsContainer,
    activeItemsContainer,
  } = renderUtil();
  const text = 'something fun';

  const { addedCheckBox, itemId } = await addItem(text);
  fireEvent.click(addedCheckBox);
  const completedCheckBox = getByTestIdUnbound(completedItemsContainer, itemId);
  fireEvent.click(completedCheckBox);

  const uncheckedCheckBox = getByTestIdUnbound(activeItemsContainer, itemId);
  expect(uncheckedCheckBox.checked).toBe(false);
  expect(getByDisplayValueUnbound(activeItemsContainer, text));
});

it('can edit active items', async () => {
  const { addItem, getByDisplayValue } = renderUtil();
  const text = 'unedited';
  const { addedInput } = await addItem(text);
  const newText = 'i was edited';

  await userEvent.type(addedInput, newText, { delay: 1 });

  expect(addedInput.value).toBe(newText);
});
