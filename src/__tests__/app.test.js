import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom';
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
  const { addItem, completedItemsContainer, getByTestId } = renderUtil();
  const text = 'do thing';

  const { addedCheckBox, itemId } = await addItem(text);
  fireEvent.click(addedCheckBox);

  // Make sure input and checkbox has moved to the 'completed items' section
  const checkBox = within(completedItemsContainer).getByTestId(itemId);
  const input = within(completedItemsContainer).getByDisplayValue(text);
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
  const completedCheckBox = within(completedItemsContainer).getByTestId(itemId);
  fireEvent.click(completedCheckBox);

  const uncheckedCheckBox = within(activeItemsContainer).getByTestId(itemId);
  const input = within(activeItemsContainer).getByDisplayValue(text);
  expect(uncheckedCheckBox.checked).toBe(false);
  expect(input).toBeDefined();
});

it('can edit active items', async () => {
  const { addItem, getByDisplayValue } = renderUtil();
  const text = 'unedited';
  const { addedInput } = await addItem(text);
  const newText = 'i was edited';

  await userEvent.type(addedInput, newText, { delay: 1 });

  expect(addedInput.value).toBe(newText);
});

it('shows the number of completed items', async () => {
  const { addItem, getByText } = renderUtil();
  const addAndComplete = async (text) => {
    const { addedCheckBox } = await addItem(text);
    fireEvent.click(addedCheckBox);
  };

  await addAndComplete('item1');
  expect(getByText('1 Completed item')).toBeDefined();
  await addAndComplete('item2');
  expect(getByText('2 Completed items')).toBeDefined();
});

it("hides the number of completed items when there aren't any", () => {
  const { completedItemsContainer } = renderUtil();

  expect(completedItemsContainer).toHaveClass('hidden');
});
