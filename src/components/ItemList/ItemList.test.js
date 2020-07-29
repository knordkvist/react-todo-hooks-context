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
