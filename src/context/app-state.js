import React, { createContext, useReducer } from 'react';
import appReducer, {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
} from './app-reducer';

export const AppStateContext = createContext(appReducer(undefined));

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appReducer());

  const dispatchAddItem = (text) => dispatch(addItem({ text }));
  const dispatchCompleteItem = (itemId) => dispatch(completeItem(itemId));
  const dispatchUncheckItem = (itemId) => dispatch(uncheckItem(itemId));
  const dispatchEditItem = (itemId, text) => dispatch(editItem(itemId, text));

  return (
    <AppStateContext.Provider
      value={{
        state,
        addItem: dispatchAddItem,
        completeItem: dispatchCompleteItem,
        uncheckItem: dispatchUncheckItem,
        editItem: dispatchEditItem,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
