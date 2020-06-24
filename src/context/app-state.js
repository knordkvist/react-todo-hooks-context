import React, { createContext, useReducer } from 'react';

const itemState = {
  active: 'active',
  completed: 'completed',
};

const getTodoItems = (items) =>
  items.filter((i) => i.status === itemState.active);
const getCompletedItems = (items) =>
  items.filter((i) => i.status === itemState.completed);

const initialState = {
  items: [
    { description: 'paint the house', state: itemState.active },
    { description: 'buy milk', status: itemState.completed },
  ],
  get todoItems() {
    return getTodoItems(this.items);
  },
  get completedItems() {
    return getCompletedItems(this.items);
  },
};

export const AppStateContext = createContext(initialState);

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(() => {}, initialState);

  return (
    <AppStateContext.Provider value={{ ...state }}>
      {children}
    </AppStateContext.Provider>
  );
};
