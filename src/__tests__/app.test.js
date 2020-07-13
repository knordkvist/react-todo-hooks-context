import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../app';

function renderUtil() {
  const renderResult = render(<App />);
  const newItemInput = renderResult.getByPlaceholderText('todo...');

  const addItem = async (text = '') => {
    await userEvent.type(newItemInput, text, {
      // The delay is useful for catching focus loss, eg. due to erroneous rerendering
      delay: 1,
    });

    const addedInput = renderResult.getByDisplayValue(text);
    const itemId = addedInput.dataset.itemId;

    return {
      addedInput,
      itemId,
      get itemContainer() {
        return renderResult.getByTestId(itemId);
      },
      get toggleCheckbox() {
        return within(this.itemContainer).getByLabelText('Toggle todo');
      },
    };
  };

  return {
    ...renderResult,
    newItemInput,
    addItem,
    get completedItemsContainer() {
      return renderResult.getByTestId('completed-items-container');
    },
    get activeItemsContainer() {
      return renderResult.getByTestId('active-items-container');
    },
    get todoItems() {
      return document.querySelectorAll('.check-list li.todo-item');
    },
    get instructionsContainer() {
      return renderResult.queryByTestId('instructions-container');
    },
  };
}

it('automatically focuses the new item input', () => {
  const { newItemInput } = renderUtil();

  expect(newItemInput).toHaveFocus();
});

it('adds an active todo when entering text', async () => {
  const { addItem, activeItemsContainer } = renderUtil();
  const text = 'buy milk';

  const { toggleCheckbox, addedInput, itemContainer } = await addItem(text);

  expect(toggleCheckbox).not.toBeChecked();
  expect(addedInput).toHaveValue(text);
  expect(activeItemsContainer).toContainElement(itemContainer);
  expect(activeItemsContainer.querySelectorAll('li.todo-item')).toHaveLength(1);
});

it('clears the new item input after adding a new item', async () => {
  const { addItem, newItemInput } = renderUtil();

  await addItem('a new item!');

  expect(newItemInput).toHaveValue('');
});

it('can complete active items', async () => {
  const { addItem, completedItemsContainer } = renderUtil();
  const text = 'do thing';

  const addItemRes = await addItem(text);
  fireEvent.click(addItemRes.toggleCheckbox);

  expect(completedItemsContainer).toContainElement(addItemRes.itemContainer);
  expect(addItemRes.toggleCheckbox).toBeChecked();
});

it('can uncheck completed items', async () => {
  const { addItem, activeItemsContainer } = renderUtil();
  const text = 'something fun';

  const addItemRes = await addItem(text);
  fireEvent.click(addItemRes.toggleCheckbox);
  fireEvent.click(addItemRes.toggleCheckbox);

  expect(activeItemsContainer).toContainElement(addItemRes.itemContainer);
  expect(addItemRes.toggleCheckbox).not.toBeChecked();
});

it('can edit active items', async () => {
  const { addItem } = renderUtil();
  const text = 'unedited';
  const { addedInput } = await addItem(text);
  const newText = 'i was edited';

  userEvent.type(addedInput, '{backspace}'.repeat(text.length));
  await userEvent.type(addedInput, newText, { delay: 1 });

  expect(addedInput.value).toBe(newText);
});

describe('pressing enter when editing an item', () => {
  describe('active items', () => {
    it('creates and focuses a new empty item when there is no text to the right of the caret', async () => {
      const renderUtilRes = renderUtil();
      const { addItem, getByDisplayValue } = renderUtilRes;

      const addItemRes = await addItem('item1');
      userEvent.type(addItemRes.addedInput, '{Enter}');
      fireEvent.keyDown(addItemRes.addedInput, { key: 'Enter' });
      await userEvent.type(document.activeElement, 'item2', { delay: 1 });
      const item2Input = getByDisplayValue('item2');

      expect(item2Input).toHaveFocus();
      expect(renderUtilRes.todoItems).toHaveLength(2);
    });

    it('creates a new item containing the text to the right of the caret', async () => {
      const renderResult = renderUtil();
      const { addItem, getByDisplayValue } = renderResult;
      const text1 = 'split';
      const text2 = 'item';

      const { addedInput } = await addItem(text1 + text2);
      // Firing arrow events was unsuccessful, set selectionStart as workaround
      addedInput.selectionStart = text1.length;
      fireEvent.keyDown(addedInput, { key: 'Enter' });

      expect(getByDisplayValue(text1)).toBeInTheDocument();
      expect(getByDisplayValue(text2)).toBeInTheDocument();
      expect(renderResult.todoItems).toHaveLength(2);
    });
  });

  describe('completed items', () => {
    it('does not split completed items', async () => {
      const renderResult = renderUtil();
      const { addItem, completedItemsContainer } = renderResult;
      const text = 'completed';

      const addItemRes = await addItem(text);
      userEvent.click(addItemRes.toggleCheckbox);
      addItemRes.addedInput.selectionStart = 2;
      fireEvent.keyDown(addItemRes.addedInput, { key: 'Enter' });

      expect(completedItemsContainer).toContainElement(
        addItemRes.itemContainer
      );
      expect(renderResult.todoItems).toHaveLength(1);
    });
  });
});

describe('merging items', () => {
  it('can merge an item into the one before it', async () => {
    const { addItem, getByDisplayValue, queryByDisplayValue } = renderUtil();
    const item1Text = 'item1';
    const item2Text = 'item2';

    await addItem(item1Text);
    const { addedInput: item2Input } = await addItem(item2Text);
    item2Input.selectionStart = 0;
    fireEvent.keyDown(item2Input, { key: 'Backspace' });

    expect(queryByDisplayValue(item1Text)).not.toBeInTheDocument();
    expect(queryByDisplayValue(item2Text)).not.toBeInTheDocument();
    const mergedInto = getByDisplayValue(item1Text + item2Text);
    expect(mergedInto).toBeInTheDocument();
    expect(mergedInto).toHaveFocus();
    expect(mergedInto.selectionStart).toBe(item1Text.length);
    expect(mergedInto.selectionEnd).toBe(item1Text.length);
  });

  it('does nothing if there is no item before it', async () => {
    const { addItem, queryByDisplayValue } = renderUtil();
    const item1Text = 'item1';
    const item2Text = 'item2';

    const { addedInput: item1Input } = await addItem(item1Text);
    await addItem(item2Text);
    item1Input.focus();
    item1Input.selectionStart = 0;
    fireEvent.keyDown(item1Input, { key: 'Backspace' });

    expect(queryByDisplayValue(item1Text)).toBeInTheDocument();
    expect(queryByDisplayValue(item2Text)).toBeInTheDocument();
    expect(item1Input).toHaveFocus();
  });
});

describe('showing the number of completed items', () => {
  it('shows the number of completed items', async () => {
    const { addItem, getByText } = renderUtil();
    const addAndComplete = async (text) => {
      const { toggleCheckbox } = await addItem(text);
      userEvent.click(toggleCheckbox);
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
});

describe('app instructions', () => {
  it('is visible when the app is loaded', () => {
    const { getByText } = renderUtil();

    expect(getByText('Start typing to add a new item')).toBeDefined();
    expect(getByText('Got it!')).toBeDefined();
  });

  it('can be dismissed by clicking the button', () => {
    const renderResult = renderUtil();

    fireEvent.click(
      within(renderResult.instructionsContainer).getByText('Got it!')
    );

    expect(renderResult.instructionsContainer).toBeNull();
  });

  it('is automatically dismissed when an item is added', async () => {
    const { addItem, queryByTestId } = renderUtil();

    await addItem('a');
    expect(queryByTestId('instructions-container')).toBeNull();
  });
});
