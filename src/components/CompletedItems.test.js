import React from 'react';
import {
  render as renderWithoutProvider,
  fireEvent,
  waitFor,
} from 'test-utils';
import { utils as reducerUtils } from '../context/app-reducer.test';
import { addItem } from '../context/reducer-actions';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ActiveItems from './ActiveItems';
import CompletedItems from './CompletedItems';
import { AppStateProvider } from '../context/app-state';
import Todo from '../model/Todo';

const render = renderWithoutProvider(AppStateProvider);
const { chainActions } = reducerUtils;

it('can uncheck completed items', async () => {
  const item = {
    description: 'something fun',
    state: Todo.State.Completed,
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
  const item = { description: 'completed', state: Todo.State.Completed, id: 0 };

  const { descriptionInput } = render(<CompletedItems />, {
    todoItems: chainActions(addItem(item)),
  });

  expect(descriptionInput(item.id)).toHaveAttribute('readonly');
});

describe('pressing enter when editing description', () => {
  it('does not split items', async () => {
    const itemId = 0;
    const {
      completedItemsContainer,
      descriptionInput,
      todoItemContainer,
      todoItems,
    } = render(<CompletedItems />, {
      todoItems: chainActions(
        addItem({
          description: 'completed item',
          state: Todo.State.Completed,
          id: itemId,
        })
      ),
    });

    const input = descriptionInput(itemId);
    input.selectionStart = 2;
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(completedItemsContainer()).toContainElement(
      todoItemContainer(itemId)
    );
    expect(todoItems()).toHaveLength(1);
  });
});

it('shows the number of completed items', async () => {
  const oneCompletedItem = chainActions(
    addItem({ state: Todo.State.Completed }),
    addItem({ state: Todo.State.Active })
  );
  const twoCompletedItems = chainActions(
    addItem({ state: Todo.State.Completed }),
    addItem({ state: Todo.State.Active }),
    addItem({ state: Todo.State.Completed })
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
