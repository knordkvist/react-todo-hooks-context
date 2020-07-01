let id = 0;
const nextId = () => id++;

export const itemState = {
  active: 'active',
  completed: 'completed',
};

export const addItem = ({
  text = '',
  id = nextId(),
  state = itemState.active,
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

const createState = (items) => ({
  items,
  activeItems: items.filter((item) => item.state === itemState.active),
  completedItems: items.filter((item) => item.state === itemState.completed),
});

const initialState = createState([]);

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case addItem.type:
      return createState([...state.items, payload]);
    case completeItem.type:
      const items = state.items.map((item) => {
        if (item.id !== payload.id) return item;
        return { ...item, state: itemState.completed };
      });
      return createState(items);
    case uncheckItem.type: {
      const items = state.items.map((item) => {
        if (item.id !== payload.id) return item;
        return { ...item, state: itemState.active };
      });
      return createState(items);
    }
    default:
      return state;
  }
}
