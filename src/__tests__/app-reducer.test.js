import appReducer, {
  Items,
  Item,
  addItem,
  completeItem,
  uncheckItem,
  editItem,
} from '../context/app-reducer';

// This is a useful feature of reducers: if we decide to use Redux later,
// it will call each reducer with no state to produce the initial state for the store.
// This also makes it very easy to produce the initial state for unit testing
it('produces a valid initial state', () => {
  const initialState = appReducer();

  expect(initialState).toEqual(new Items([]));
});

it('can add items', () => {
  const expectedState = new Items([
    {
      text: 'item1',
      id: 0,
      state: Item.State.active,
    },
  ]);

  const result = appReducer(undefined, addItem({ text: 'item1' }));

  expect(result).toEqual(expectedState);
});

it('can complete active items', () => {
  const item = { text: 'buy things', id: 0 };
  const withItem = appReducer(undefined, addItem(item));
  const expectedState = new Items([{ ...item, state: Item.State.completed }]);

  const afterCompleting = appReducer(withItem, completeItem(item.id));

  expect(afterCompleting).toEqual(expectedState);
});

it('can uncheck completed items', () => {
  const item = { text: 'do stuff', id: 0 };
  const withAddedItem = appReducer(undefined, addItem(item));
  const withCompletedItem = appReducer(withAddedItem, completeItem(item.id));

  const withUncheckedItem = appReducer(withCompletedItem, uncheckItem(item.id));

  expect(withUncheckedItem).toEqual(withAddedItem);
});

it('can edit active items', () => {
  const item = { text: 'unedited', id: 0 };
  const expectedState = appReducer(
    undefined,
    addItem({ ...item, text: 'edited' })
  );

  const edited = appReducer(new Items([item]), editItem(item.id, 'edited'));

  expect(edited).toEqual(expectedState);
});
