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

const initialState = {
  items: [],
  activeItems: [],
  completedItems: [],
};

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case addItem.type:
      return {
        ...state,
        items: [...state.items, payload],
        activeItems: [...state.activeItems, payload],
      };
    default:
      return state;
  }
}
