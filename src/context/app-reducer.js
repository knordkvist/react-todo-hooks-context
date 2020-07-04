import { Items } from './Items';
import { Item } from './Item';

let id = 0;
export const nextId = () => id++;

export const itemState = {
  active: 'active',
  completed: 'completed',
};

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

export default function reducer(state = new Items([]), { type, payload } = {}) {
  switch (type) {
    case addItem.type:
      return new Items([...state.items, payload]);
    case completeItem.type:
      const items = state.items.map((item) => {
        if (item.id !== payload.id) return item;
        return { ...item, state: Item.State.Completed };
      });
      return new Items(items);
    case uncheckItem.type: {
      const items = state.items.map((item) => {
        if (item.id !== payload.id) return item;
        return { ...item, state: Item.State.Active };
      });
      return new Items(items);
    }
    case editItem.type: {
      const items = state.items.map((item) => {
        if (item.id !== payload.id) return item;

        return { ...item, text: payload.text };
      });
      return new Items(items);
    }
    default:
      return state;
  }
}
