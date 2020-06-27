import React, { createContext, useReducer } from 'react';
import appReducer, { addItem, completeItem } from './app-reducer';

export const AppStateContext = createContext(appReducer);

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appReducer());

  const dispatchAddItem = (text) => dispatch(addItem({ text }));

  const dispatchCompleteItem = (itemId) => dispatch(completeItem(itemId));

  return (
    <AppStateContext.Provider
      value={{
        ...state,
        addItem: dispatchAddItem,
        completeItem: dispatchCompleteItem,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
