import React, { createContext, useReducer, useState } from 'react';
import appReducer, {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
} from './app-reducer';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [todoItems, dispatch] = useReducer(appReducer, appReducer());
  const dispatchAddItem = (text) => dispatch(addItem({ text }));
  const dispatchCompleteItem = (itemId) => dispatch(completeItem(itemId));
  const dispatchUncheckItem = (itemId) => dispatch(uncheckItem(itemId));
  const dispatchEditItem = (itemId, text) => dispatch(editItem(itemId, text));
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const dismissInstructions = () => setInstructionsVisible(false);

  return (
    <AppStateContext.Provider
      value={{
        todoItems,
        addItem: (text) => {
          dispatchAddItem(text);
          dismissInstructions();
        },
        completeItem: dispatchCompleteItem,
        uncheckItem: dispatchUncheckItem,
        editItem: dispatchEditItem,
        instructionsVisible,
        dismissInstructions,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
