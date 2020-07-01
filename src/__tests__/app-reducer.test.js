import appReducer, {
  itemState,
  addItem,
  completeItem,
  uncheckItem,
} from '../context/app-reducer';

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

it('can complete active items', () => {
  const item = { text: 'buy things', id: 0, state: itemState.active };
  const completedItem = { ...item, state: itemState.completed };
  const withItem = appReducer(undefined, addItem(item));
  const afterCompleting = appReducer(withItem, completeItem(item.id));
  expect(afterCompleting).toEqual({
    items: [completedItem],
    activeItems: [],
    completedItems: [completedItem],
  });
});

it('can uncheck completed items', () => {
  const item = { text: 'do stuff', id: 0 };
  const withAddedItem = appReducer(undefined, addItem(item));
  const withCompletedItem = appReducer(withAddedItem, completeItem(item.id));
  const withUncheckedItem = appReducer(withCompletedItem, uncheckItem(item.id));

  expect(withUncheckedItem).toEqual(withAddedItem);
});
