import appReducer, { itemState, addItem } from '../context/app-reducer';

// This is a useful feature of reducers: if we decide to use Redux later,
// it will call each reducer with no state to produce the initial state for the store.
// This also makes it very easy to produce the initial state for unit testing
it('produces a valid initial state', () => {
  const initialState = appReducer();
  expect(initialState).toEqual({
    items: [],
    activeItems: [],
    completedItems: [],
  });
});

it('can add items', () => {
  const expectedItem = { text: 'item1', id: 1, state: itemState.active };
  expect(appReducer(undefined, addItem(expectedItem))).toEqual({
    items: [expectedItem],
    activeItems: [expectedItem],
    completedItems: [],
  });
});
