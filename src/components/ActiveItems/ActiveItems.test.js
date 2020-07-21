import React from 'react';
import { render as renderWithoutProvider, fireEvent } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ActiveItems from 'components/ActiveItems';
import CompletedItems from 'components/CompletedItems';
import { AppStateProvider } from 'context/app-state';
import TodoItem from 'model/TodoItem';
import { utils as reducerUtils } from 'context/app-reducer.test';
import * as reducerActions from 'context/reducer-actions';

const render = renderWithoutProvider(AppStateProvider);
const { chainActions } = reducerUtils;

it('adds an active todo when typing a description', async () => {
  const {
    actions: { addItem },
    activeItemsContainer,
    todoItems,
  } = render(<ActiveItems />);
  const description = 'todo';

  const { toggleCheckbox, descriptionInput, itemContainer } = await addItem(
    description
  );

  expect(toggleCheckbox()).not.toBeChecked();
  expect(descriptionInput()).toHaveValue(description);
  expect(activeItemsContainer()).toContainElement(itemContainer());
  expect(todoItems()).toHaveLength(1);
});

it('clears the new item input after adding a new item', async () => {
  const {
    actions: { addItem },
    newItemInput,
  } = render(<ActiveItems />);

  await addItem('todo');

  expect(newItemInput()).toHaveValue('');
});

it('can complete items', async () => {
  const addedItem = { state: TodoItem.State.Active, id: 0 };
  const { completedItemsContainer, toggleCheckbox, todoItemContainer } = render(
    <>
      <ActiveItems />
      <CompletedItems />
    </>,
    { todoItems: chainActions(reducerActions.addItem(addedItem)) }
  );

  const checkbox = toggleCheckbox(addedItem.id);
  userEvent.click(checkbox);

  expect(completedItemsContainer()).toContainElement(
    todoItemContainer(addedItem.id)
  );
  expect(checkbox).toBeChecked();
});

it('can edit items', async () => {
  const uneditedItem = {
    description: 'unedited',
    id: '0',
  };
  const newText = 'new';
  const { descriptionInput } = render(<ActiveItems />, {
    todoItems: chainActions(reducerActions.addItem(uneditedItem)),
  });
  const input = descriptionInput(uneditedItem.id);

  userEvent.type(input, '{backspace}'.repeat(uneditedItem.description.length));
  userEvent.type(input, newText);

  expect(input).toHaveValue(newText);
});

describe('pressing enter when editing description', () => {
  it('creates and focuses a new empty item when there is no text to the right of the caret', async () => {
    const itemId = 0;
    const item2Text = 'i2';
    const { getByDisplayValue, descriptionInput, todoItems } = render(
      <ActiveItems />,
      {
        todoItems: chainActions(reducerActions.addItem({ id: itemId })),
      }
    );

    const input = descriptionInput(itemId);
    userEvent.type(input, '{Enter}');
    fireEvent.keyDown(input, { key: 'Enter' });
    await userEvent.type(document.activeElement, item2Text, { delay: 1 });
    const item2Input = getByDisplayValue(item2Text);

    expect(item2Input).toHaveFocus();
    expect(todoItems()).toHaveLength(2);
  });

  it('creates a new item with a description equal to the text to the right of the caret', async () => {
    const text1 = 'split';
    const text2 = 'item';
    const item1 = { description: text1 + text2, id: 0 };
    const { getByDisplayValue, todoItems, descriptionInput } = render(
      <ActiveItems />,
      {
        todoItems: chainActions(reducerActions.addItem(item1)),
      }
    );

    // Firing arrow events was unsuccessful, set selectionStart as workaround
    const input = descriptionInput(item1.id);
    input.selectionStart = text1.length;
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getByDisplayValue(text1)).toBeInTheDocument();
    expect(getByDisplayValue(text2)).toBeInTheDocument();
    expect(todoItems()).toHaveLength(2);
  });
});

describe('merging items', () => {
  it('can merge an item into the one before it', async () => {
    const item1 = { description: 'item1', id: 0 };
    const item2 = { description: 'item2', id: 1 };
    const { getByDisplayValue, queryByDisplayValue, descriptionInput } = render(
      <ActiveItems />,
      {
        todoItems: chainActions(
          reducerActions.addItem(item1),
          reducerActions.addItem(item2)
        ),
      }
    );

    const item2Input = descriptionInput(item2.id);
    item2Input.selectionStart = 0;
    fireEvent.keyDown(item2Input, { key: 'Backspace' });

    expect(queryByDisplayValue(item1.description)).not.toBeInTheDocument();
    expect(queryByDisplayValue(item2.description)).not.toBeInTheDocument();
    const mergedInto = getByDisplayValue(item1.description + item2.description);
    expect(mergedInto).toBeInTheDocument();
    expect(mergedInto).toHaveFocus();
    expect(mergedInto.selectionStart).toBe(item1.description.length);
    expect(mergedInto.selectionEnd).toBe(item1.description.length);
  });

  it('does nothing if there is no item before it', async () => {
    const item1 = { description: 'item1', id: 0 };
    const item2Text = 'item2';
    const { queryByDisplayValue, descriptionInput } = render(<ActiveItems />, {
      todoItems: chainActions(
        reducerActions.addItem(item1),
        reducerActions.addItem({ description: item2Text })
      ),
    });

    const input = descriptionInput(item1.id);
    input.focus();
    input.selectionStart = 0;
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(queryByDisplayValue(item1.description)).toBeInTheDocument();
    expect(queryByDisplayValue(item2Text)).toBeInTheDocument();
    expect(input).toHaveFocus();
  });
});
