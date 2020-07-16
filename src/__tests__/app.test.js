import React from 'react';
import { render, fireEvent, getByLabelText } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';
import { AppStateProvider } from '../context/app-state';
import ActiveItems from '../components/ActiveItems';
import CompletedItems from '../components/CompletedItems';
import Instructions from '../components/Instructions';

const renderUtil = (component, options = {}) => {
  if (!component) throw new Error('No component supplied');

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

  const renderResult = render(component, AppStateProvider, options);
  return {
    ...renderResult,
    addItem: (text) => addItem(renderResult, renderResult.newItemInput(), text),
  };
};

it('automatically focuses the new item input', () => {
  const { newItemInput } = renderUtil(<TodoList />);

  expect(newItemInput()).toHaveFocus();
});

it('adds an active todo when entering text', async () => {
  const { addItem, activeItemsContainer } = renderUtil(<TodoList />);
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
  const { addItem, newItemInput } = renderUtil(<ActiveItems />);

  await addItem('a new item!');

  expect(newItemInput()).toHaveValue('');
});

it('can complete active items', async () => {
  const { addItem, completedItemsContainer } = renderUtil(
    <>
      <ActiveItems />
      <CompletedItems />
    </>
  );
  const text = 'do thing';

  const { itemContainer, toggleCheckbox } = await addItem(text);
  fireEvent.click(toggleCheckbox());

  expect(completedItemsContainer()).toContainElement(itemContainer());
  expect(toggleCheckbox()).toBeChecked();
});

it('can uncheck completed items', async () => {
  const { addItem, activeItemsContainer } = renderUtil(
    <>
      <ActiveItems />
      <CompletedItems />
    </>
  );
  const text = 'something fun';

  const { toggleCheckbox, itemContainer } = await addItem(text);
  fireEvent.click(toggleCheckbox());
  fireEvent.click(toggleCheckbox());

  expect(activeItemsContainer()).toContainElement(itemContainer());
  expect(toggleCheckbox()).not.toBeChecked();
});

it('can edit active items', async () => {
  const text = 'unedited';
  const newText = 'i was edited';
  const { addItem } = renderUtil(<ActiveItems />);
  const { addedInput } = await addItem(text);

  userEvent.type(addedInput(), '{backspace}'.repeat(text.length));
  await userEvent.type(addedInput(), newText, { delay: 1 });

  expect(addedInput()).toHaveValue(newText);
});

describe('pressing enter when editing an item', () => {
  describe('active items', () => {
    it('creates and focuses a new empty item when there is no text to the right of the caret', async () => {
      const { addItem, getByDisplayValue, todoItems } = renderUtil(
        <ActiveItems />
      );

      const { addedInput } = await addItem('item1');
      userEvent.type(addedInput(), '{Enter}');
      fireEvent.keyDown(addedInput(), { key: 'Enter' });
      await userEvent.type(document.activeElement, 'item2', { delay: 1 });
      const item2Input = getByDisplayValue('item2');

      expect(item2Input).toHaveFocus();
      expect(todoItems()).toHaveLength(2);
    });

    it('creates a new item containing the text to the right of the caret', async () => {
      const renderResult = renderUtil(<ActiveItems />);
      const { addItem, getByDisplayValue, todoItems } = renderResult;
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

  describe('completed items', () => {
    it('does not split completed items', async () => {
      const { addItem, completedItemsContainer, todoItems } = renderUtil(
        <>
          <ActiveItems />
          <CompletedItems />
        </>
      );
      const text = 'completed';

      const { itemContainer, toggleCheckbox, addedInput } = await addItem(text);
      userEvent.click(toggleCheckbox());
      addedInput().selectionStart = 2;
      fireEvent.keyDown(addedInput(), { key: 'Enter' });

      expect(completedItemsContainer()).toContainElement(itemContainer());
      expect(todoItems()).toHaveLength(1);
    });
  });
});

describe('merging items', () => {
  it('can merge an item into the one before it', async () => {
    const { addItem, getByDisplayValue, queryByDisplayValue } = renderUtil(
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
    const { addItem, queryByDisplayValue } = renderUtil(
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

describe('showing the number of completed items', () => {
  it('shows the number of completed items', async () => {
    const { addItem, getByText } = renderUtil(
      <>
        <ActiveItems />
        <CompletedItems />
      </>
    );
    const addAndComplete = async (text) => {
      const { toggleCheckbox } = await addItem(text);
      userEvent.click(toggleCheckbox());
    };

    await addAndComplete('item1');
    expect(getByText('1 Completed item')).toBeDefined();
    await addAndComplete('item2');
    expect(getByText('2 Completed items')).toBeDefined();
  });

  it("hides the number of completed items when there aren't any", () => {
    const { completedItemsContainer } = renderUtil(<CompletedItems />);

    expect(completedItemsContainer()).toHaveClass('hidden');
  });
});

describe('app instructions', () => {
  it('is visible when the app is loaded', () => {
    const { getByText } = renderUtil(<Instructions />);

    expect(getByText('Start typing to add a new item')).toBeDefined();
    expect(getByText('Got it!')).toBeDefined();
  });

  it('can be dismissed by clicking the button', () => {
    const { instructionsContainer, getByText } = renderUtil(<Instructions />);

    const dismissButton = getByText('Got it!');
    fireEvent.click(dismissButton);

    expect(instructionsContainer()).not.toBeInTheDocument();
  });

  it('is automatically dismissed when an item is added', async () => {
    const { addItem, instructionsContainer } = renderUtil(
      <>
        <ActiveItems />
        <Instructions />
      </>
    );

    await addItem('a');
    expect(instructionsContainer()).toBeNull();
  });
});
