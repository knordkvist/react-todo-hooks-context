import React, { createContext, useReducer } from 'react';
import appReducer, { addItem } from './app-reducer';

export const AppStateContext = createContext(appReducer);

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appReducer());

  function dispatchAddItem(text) {
    dispatch(addItem({ text }));
  }

  return (
    <AppStateContext.Provider value={{ ...state, addItem: dispatchAddItem }}>
      {children}
    </AppStateContext.Provider>
  );
};
