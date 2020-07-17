import React from 'react';
import { render as renderWithoutProvider, fireEvent } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ActiveItems from './ActiveItems';
import CompletedItems from './CompletedItems';
import { AppStateProvider } from '../context/app-state';

const render = renderWithoutProvider(AppStateProvider);

it('adds an active todo when entering text', async () => {
  const {
    actions: { addItem },
    activeItemsContainer,
  } = render(<ActiveItems />);
  const text = 'buy milk';

  const { toggleCheckbox, addedInput, itemContainer } = await addItem(text);

  expect(toggleCheckbox()).not.toBeChecked();
  expect(addedInput()).toHaveValue(text);
  expect(activeItemsContainer()).toContainElement(itemContainer());
  expect(activeItemsContainer().querySelectorAll('li.todo-item')).toHaveLength(
    1
  );
});

it('clears the new item input after adding a new item', async () => {
  const {
    actions: { addItem },
    newItemInput,
  } = render(<ActiveItems />);

  await addItem('a new item!');

  expect(newItemInput()).toHaveValue('');
});

it('can complete items', async () => {
  const {
    actions: { addItem },
    completedItemsContainer,
  } = render(
    <>
      <ActiveItems />
      <CompletedItems />
    </>
  );
  const text = 'do thing';

  const { itemContainer, toggleCheckbox } = await addItem(text);
  userEvent.click(toggleCheckbox());

  expect(completedItemsContainer()).toContainElement(itemContainer());
  expect(toggleCheckbox()).toBeChecked();
});

it('can edit items', async () => {
  const text = 'unedited';
  const newText = 'i was edited';
  const {
    actions: { addItem },
  } = render(<ActiveItems />);
  const { addedInput } = await addItem(text);

  userEvent.type(addedInput(), '{backspace}'.repeat(text.length));
  await userEvent.type(addedInput(), newText, { delay: 1 });

  expect(addedInput()).toHaveValue(newText);
});

describe('pressing enter when editing description', () => {
  it('creates and focuses a new empty item when there is no text to the right of the caret', async () => {
    const {
      actions: { addItem },
      getByDisplayValue,
      todoItems,
    } = render(<ActiveItems />);

    const { addedInput } = await addItem('item1');
    userEvent.type(addedInput(), '{Enter}');
    fireEvent.keyDown(addedInput(), { key: 'Enter' });
    await userEvent.type(document.activeElement, 'item2', { delay: 1 });
    const item2Input = getByDisplayValue('item2');

    expect(item2Input).toHaveFocus();
    expect(todoItems()).toHaveLength(2);
  });

  it('creates a new item containing the text to the right of the caret', async () => {
    const renderResult = render(<ActiveItems />);
    const {
      actions: { addItem },
      getByDisplayValue,
      todoItems,
    } = renderResult;
    const text1 = 'split';
    const text2 = 'item';

    const { addedInput } = await addItem(text1 + text2);
    // Firing arrow events was unsuccessful, set selectionStart as workaround
    addedInput().selectionStart = text1.length;
    fireEvent.keyDown(addedInput(), { key: 'Enter' });

    expect(getByDisplayValue(text1)).toBeInTheDocument();
    expect(getByDisplayValue(text2)).toBeInTheDocument();
    expect(todoItems()).toHaveLength(2);
  });
});

describe('merging items', () => {
  it('can merge an item into the one before it', async () => {
    const {
      actions: { addItem },
      getByDisplayValue,
      queryByDisplayValue,
    } = render(
      <>
        <ActiveItems />
        <CompletedItems />
      </>
    );
    const item1Text = 'item1';
    const item2Text = 'item2';

    await addItem(item1Text);
    const { addedInput: item2Input } = await addItem(item2Text);
    item2Input().selectionStart = 0;
    fireEvent.keyDown(item2Input(), { key: 'Backspace' });

    expect(queryByDisplayValue(item1Text)).not.toBeInTheDocument();
    expect(queryByDisplayValue(item2Text)).not.toBeInTheDocument();
    const mergedInto = getByDisplayValue(item1Text + item2Text);
    expect(mergedInto).toBeInTheDocument();
    expect(mergedInto).toHaveFocus();
    expect(mergedInto.selectionStart).toBe(item1Text.length);
    expect(mergedInto.selectionEnd).toBe(item1Text.length);
  });

  it('does nothing if there is no item before it', async () => {
    const {
      actions: { addItem },
      queryByDisplayValue,
    } = render(
      <>
        <ActiveItems />
        <CompletedItems />
      </>
    );
    const item1Text = 'item1';
    const item2Text = 'item2';

    const { addedInput: item1Input } = await addItem(item1Text);
    await addItem(item2Text);
    item1Input().focus();
    item1Input().selectionStart = 0;
    fireEvent.keyDown(item1Input(), { key: 'Backspace' });

    expect(queryByDisplayValue(item1Text)).toBeInTheDocument();
    expect(queryByDisplayValue(item2Text)).toBeInTheDocument();
    expect(item1Input()).toHaveFocus();
  });
});
