import React from 'react';
import { render as renderWithoutAppStateProvider } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { chainActions } from 'utils/test-utils';
import { addItem } from 'context/reducer-actions';
import TodoItem from 'model/TodoItem';
import ItemList from 'components/ItemList';
import { AppStateProvider, useAppState } from 'context/app-state';

const render = renderWithoutAppStateProvider(AppStateProvider);

// Utility component for keeping the ItemList updated.
// The alternative would be pulling the updated state from context and manually rerendering with the updated item prop.
function WithItemsFromContext() {
  const { todoItems } = useAppState();

  return <ItemList items={todoItems.items} />;
}

it("doesn't try to merge items when a range is selected", async () => {
  const item = new TodoItem({ description: 'item1' });
  const noMerge = new TodoItem({ description: 'should not merge' });
  const items = chainActions(addItem(item), addItem(noMerge));
  const {
    descriptionInput,
    todoItemContainer,
  } = render(<WithItemsFromContext />, { todoItems: items });
  const input = descriptionInput(noMerge.id);

  input.selectionStart = 0;
  input.selectionEnd = noMerge.description.length;
  userEvent.type(input, '{backspace}');

  expect(todoItemContainer(noMerge.id)).toBeInTheDocument();
  expect(input).toHaveValue('');
  expect(descriptionInput(item.id)).toHaveValue(item.description);
});

it('deletes the selected range before splitting an item', () => {
  const description1 = 'split';
  const divider = '____';
  const description2 = 'item';
  const item = new TodoItem({
    description: description1 + divider + description2,
  });
  const items = chainActions(addItem(item));
  //render with item
  const { descriptionInput, todoItems, queryByDisplayValue } = render(
    <WithItemsFromContext />,
    {
      todoItems: items,
    }
  );
  const input = descriptionInput(item.id);

  input.selectionStart = description1.length;
  input.selectionEnd = description1.length + divider.length;
  // userEvent.type(input, '{enter}');

  expect(todoItems()).toHaveLength(2);
  expect(queryByDisplayValue(description1)).toBeInTheDocument();
  const description2Input = queryByDisplayValue(description2);
  expect(description2Input).toBeInTheDocument();
  expect(description2Input).toHaveFocus();
  expect(description2Input.selectionStart).toBe(0);
});
