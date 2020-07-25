import React from 'react';
import {
  render as renderWithoutProvider,
  fireEvent,
  waitFor,
} from 'utils/test-utils';
import { utils as reducerUtils } from 'context/app-reducer.test';
import { addItem, completeItem } from 'context/reducer-actions';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ActiveItems from 'components/ActiveItems';
import CompletedItems from 'components/CompletedItems';
import { AppStateProvider } from 'context/app-state';
import TodoItem from 'model/TodoItem';

const render = renderWithoutProvider(AppStateProvider);
const { chainActions } = reducerUtils;

it('can uncheck completed items', async () => {
  const item = {
    description: 'something fun',
    state: TodoItem.State.Completed,
    id: 0,
  };

  const { activeItemsContainer, todoItemContainer, toggleCheckbox } = render(
    <>
      <ActiveItems />
      <CompletedItems />
    </>,
    { todoItems: chainActions(addItem(item)) }
  );
  const checkbox = toggleCheckbox(item.id);
  userEvent.click(checkbox);

  expect(activeItemsContainer()).toContainElement(todoItemContainer(item.id));
  waitFor(() => expect(checkbox).not.toBeChecked());
});

it("can't edit item description", async () => {
  const item = {
    description: 'completed',
    state: TodoItem.State.Completed,
    id: 0,
  };

  const { descriptionInput } = render(<CompletedItems />, {
    todoItems: chainActions(addItem(item)),
  });

  expect(descriptionInput(item.id)).toHaveAttribute('readonly');
});

it('shows the number of completed items', async () => {
  const oneCompletedItem = chainActions(
    addItem({ state: TodoItem.State.Completed }),
    addItem({ state: TodoItem.State.Active })
  );
  const twoCompletedItems = chainActions(
    addItem({ state: TodoItem.State.Completed }),
    addItem({ state: TodoItem.State.Active }),
    addItem({ state: TodoItem.State.Completed })
  );

  const renderResult1 = render(<CompletedItems />, {
    todoItems: oneCompletedItem,
  });
  const renderResult2 = render(<CompletedItems />, {
    todoItems: twoCompletedItems,
  });

  expect(renderResult1.getByText('1 Completed item')).toBeDefined();
  expect(renderResult2.getByText('2 Completed items')).toBeDefined();
});

it("hides the number of completed items when there aren't any", () => {
  const { completedItemsContainer } = render(<CompletedItems />);

  expect(completedItemsContainer()).toHaveClass('hidden');
});

it('can delete items', () => {
  const keep = { description: 'keep me', id: 0 };
  const deleteMe = { description: 'delete', id: 1 };
  const { deleteButton, todoItemContainer } = render(<CompletedItems />, {
    todoItems: chainActions(
      addItem(keep),
      completeItem(keep.id),
      addItem(deleteMe),
      completeItem(deleteMe.id)
    ),
  });

  userEvent.click(deleteButton(deleteMe.id));

  expect(todoItemContainer(deleteMe.id)).not.toBeInTheDocument();
  expect(todoItemContainer(keep.id)).toBeInTheDocument();
});
