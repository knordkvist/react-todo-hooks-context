import appReducer from './app-reducer';
import {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
  mergeItem,
} from './reducer-actions';
import Item from '../model/Item';
import Items from '../model/Items';

const chainActions = (...actions) =>
  chainActionsWithState(undefined, ...actions);
const chainActionsWithState = (initialState = appReducer(), ...actions) =>
  actions.reduce((state, action) => {
    return appReducer(state, action);
  }, initialState);

// This is a useful feature of reducers: if we decide to use Redux later,
// it will call each reducer with no state to produce the initial state for the store.
// This also makes it very easy to produce the initial state for unit testing
it('produces a valid initial state', () => {
  const initialState = appReducer();

  expect(initialState).toEqual(new Items([]));
});

it('can add items', () => {
  const expectedItem = {
    text: 'item1',
    id: 0,
    state: Item.State.Active,
  };

  const expectedState = new Items([expectedItem]);
  const result = appReducer(
    undefined,
    addItem({ text: expectedItem.text, id: expectedItem.id })
  );

  expect(result).toEqual(expectedState);
});

it('can complete active items', () => {
  const item = { text: 'buy things', id: 0 };
  const withCompletedItem = new Items([
    { ...item, state: Item.State.Completed },
  ]);

  const state = chainActions(addItem(item), completeItem(item.id));

  expect(state).toEqual(withCompletedItem);
});

it('can uncheck completed items', () => {
  const item = { text: 'do stuff', id: 0 };
  const withAddedItem = appReducer(undefined, addItem(item));

  const state = chainActionsWithState(
    withAddedItem,
    completeItem(item.id),
    uncheckItem(item.id)
  );

  expect(state).toEqual(withAddedItem);
});

it('can edit active items', () => {
  const item = { text: 'unedited', id: 0 };
  const expectedState = appReducer(
    undefined,
    addItem({ ...item, text: 'edited' })
  );

  const edited = chainActions(addItem(item), editItem(item.id, 'edited'));

  expect(edited).toEqual(expectedState);
});

it('can split an item in two', () => {
  const fragment1 = 'split';
  const fragment2 = 'me';
  const item = { text: fragment1 + fragment2, id: 0 };
  const newItem = { text: fragment2, id: 2 };
  const otherItem = { text: 'other', id: 1 };
  const expectedState = new Items([
    { text: fragment1, id: item.id },
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
    const item1 = { text: 'item1', id: 0 };
    const item2 = { text: 'item2', id: 1 };
    const expectedState = appReducer(
      undefined,
      addItem({ text: item1.text + item2.text, id: item1.id })
    );

    const state = chainActions(
      addItem(item1),
      addItem(item2),
      mergeItem(item2.id)
    );

    expect(state).toEqual(expectedState);
  });

  it('does nothing if the item is the first one', () => {
    const item1 = { text: 'item1', id: 0 };
    const expected = chainActions(addItem(item1), addItem({ text: 'item2' }));

    const split = chainActionsWithState(expected, mergeItem(item1.id));

    expect(expected).toEqual(split);
  });
});

export const utils = {
  chainActions,
  chainActionsWithState,
};
