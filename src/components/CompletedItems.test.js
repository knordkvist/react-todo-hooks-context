import React from 'react';
import { render as renderWithoutProvider, fireEvent, within } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ActiveItems from './ActiveItems';
import CompletedItems from './CompletedItems';
import { AppStateProvider } from '../context/app-state';

const render = renderWithoutProvider(AppStateProvider);

it('can uncheck completed items', async () => {
  const {
    actions: { addItem },
    activeItemsContainer,
  } = render(
    <>
      <ActiveItems />
      <CompletedItems />
    </>
  );
  const text = 'something fun';

  const { toggleCheckbox, itemContainer } = await addItem(text);
  userEvent.click(toggleCheckbox());
  userEvent.click(toggleCheckbox());

  expect(activeItemsContainer()).toContainElement(itemContainer());
  expect(toggleCheckbox()).not.toBeChecked();
});

it("can't edit item description", async () => {
  const {
    actions: { addItem },
  } = render(
    <>
      <ActiveItems />
      <CompletedItems />
    </>
  );

  const { itemContainer, toggleCheckbox } = await addItem('completed');
  userEvent.click(toggleCheckbox());

  expect(
    within(itemContainer()).getByLabelText('Todo description')
  ).toHaveAttribute('readonly');
});

describe('pressing enter when editing description', () => {
  it('does not split items', async () => {
    const {
      actions: { addItem },
      completedItemsContainer,
      todoItems,
    } = render(
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

it('shows the number of completed items', async () => {
  const {
    actions: { addItem },
    getByText,
  } = render(
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
  const { completedItemsContainer } = render(<CompletedItems />);

  expect(completedItemsContainer()).toHaveClass('hidden');
});
