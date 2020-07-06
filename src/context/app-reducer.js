import Items from './Items';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

export const nextId = uuidv4;

export const addItem = ({
  text = '',
  id = nextId(),
  state = Item.State.Active,
}) => ({
  type: addItem.type,
  payload: { id, text, state },
});
addItem.type = 'app-state/addItem';

export const completeItem = (itemId) => ({
  type: completeItem.type,
  payload: { id: itemId },
});
completeItem.type = 'app-state/completeItem';

export const uncheckItem = (itemId) => ({
  type: uncheckItem.type,
  payload: { id: itemId },
});
uncheckItem.type = 'app-state/uncheckItem';

export const editItem = (itemId, text) => ({
  type: editItem.type,
  payload: { id: itemId, text },
});
editItem.type = 'app-state/editItem';

export default produce((draft, { type, payload } = {}) => {
  const set = (setter) => {
    const item = draft.items.find((item) => item.id === payload.id);
    setter(item);
  };

  switch (type) {
    case addItem.type:
      draft.items.push(payload);
      return;
    case completeItem.type:
      set((item) => (item.state = Item.State.Completed));
      return;
    case uncheckItem.type: {
      set((item) => (item.state = Item.State.Active));
      return;
    }
    case editItem.type: {
      set((item) => (item.text = payload.text));
      return;
    }
    default:
      return draft;
  }
}, new Items([]));
