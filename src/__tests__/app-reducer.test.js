import appReducer, {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
} from '../context/app-reducer';
import Item from '../context/Item';
import Items from '../context/Items';

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
  const withItem = appReducer(undefined, addItem(item));
  const expectedState = new Items([{ ...item, state: Item.State.Completed }]);

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

it('can split an item in two', () => {
  const fragment1 = 'split';
  const fragment2 = 'me';
  const item = { text: fragment1 + fragment2, id: 0 };
  const otherItem = { text: 'other', id: 1 };
  const initialState = appReducer(
    appReducer(undefined, addItem(item)),
    addItem(otherItem)
  );
  const expectedState = new Items([
    { text: fragment1, id: item.id },
    { text: fragment2, id: 2 },
    otherItem,
  ]);

  const reducer = appReducer(initialState, splitItem(0, fragment1.length, 2));

  expect(reducer).toEqual(expectedState);
});
