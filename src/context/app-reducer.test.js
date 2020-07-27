import appReducer from './app-reducer';
import {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
  mergeItem,
  deleteItem,
} from './reducer-actions';
import TodoItem from '../model/TodoItem';
import TodoItems from '../model/TodoItems';
import { chainActions, chainActionsWithState } from 'utils/test-utils';

// This is a useful feature of reducers: if we decide to use Redux later,
// it will call each reducer with no state to produce the initial state for the store.
// This also makes it very easy to produce the initial state for unit testing
it('produces a valid initial state', () => {
  const initialState = appReducer();

  expect(initialState).toEqual(new TodoItems([]));
});

it('can add items', () => {
  const expectedItem = {
    description: 'item1',
    id: 0,
    state: TodoItem.State.Active,
  };

  const expectedState = new TodoItems([expectedItem]);
  const result = appReducer(
    undefined,
    addItem({ description: expectedItem.description, id: expectedItem.id })
  );

  expect(result).toEqual(expectedState);
});

it('can complete active items', () => {
  const item = { description: 'buy things', id: 0 };
  const withCompletedItem = new TodoItems([
    { ...item, state: TodoItem.State.Completed },
  ]);

  const state = chainActions(addItem(item), completeItem(item.id));

  expect(state).toEqual(withCompletedItem);
});

it('can uncheck completed items', () => {
  const item = { description: 'do stuff', id: 0 };
  const withAddedItem = appReducer(undefined, addItem(item));

  const state = chainActionsWithState(
    withAddedItem,
    completeItem(item.id),
    uncheckItem(item.id)
  );

  expect(state).toEqual(withAddedItem);
});

it('can edit active items', () => {
  const item = { description: 'unedited', id: 0 };
  const expectedState = appReducer(
    undefined,
    addItem({ ...item, description: 'edited' })
  );

  const edited = chainActions(addItem(item), editItem(item.id, 'edited'));

  expect(edited).toEqual(expectedState);
});

it('can split an item in two', () => {
  const fragment1 = 'split';
  const fragment2 = 'me';
  const item = { description: fragment1 + fragment2, id: 0 };
  const newItem = { description: fragment2, id: 2 };
  const otherItem = { description: 'other', id: 1 };
  const expectedState = new TodoItems([
    { description: fragment1, id: item.id },
    newItem,
    otherItem,
  ]);

  const state = chainActions(
    addItem(item),
    addItem(otherItem),
    splitItem(item.id, fragment1.length, newItem.id)
  );

  expect(state).toEqual(expectedState);
});

describe('merging items', () => {
  it('merges the specified item with the one before it', () => {
    const item1 = { description: 'item1', id: 0 };
    const item2 = { description: 'item2', id: 1 };
    const expectedState = appReducer(
      undefined,
      addItem({
        description: item1.description + item2.description,
        id: item1.id,
      })
    );

    const state = chainActions(
      addItem(item1),
      addItem(item2),
      mergeItem(item2.id)
    );

    expect(state).toEqual(expectedState);
  });

  it('does nothing if the item is the first one', () => {
    const item1 = { description: 'item1', id: 0 };
    const expected = chainActions(
      addItem(item1),
      addItem({ description: 'item2' })
    );

    const split = chainActionsWithState(expected, mergeItem(item1.id));

    expect(expected).toEqual(split);
  });
});

it('can delete items', () => {
  const deleteMe = { description: 'to be deleted', id: 0 };
  const completed = { description: 'completed', id: 1 };
  const expected = chainActions(addItem(completed), completeItem(completed.id));
  const initial = chainActions(
    addItem(deleteMe),
    addItem(completed),
    completeItem(completed.id)
  );

  const actual = chainActionsWithState(initial, deleteItem(deleteMe.id));

  expect(actual).toEqual(expected);
});
