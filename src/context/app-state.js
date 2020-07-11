import React, { createContext, useReducer, useState } from 'react';

import appReducer from './app-reducer';
import {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
} from './reducer-actions';

export const AppStateContext = createContext();

export const EventType = {
  ItemAdded: 'itemAdded',
  ItemSplit: 'itemSplit',
};

export const AppStateProvider = ({ children }) => {
  const [todoItems, dispatch] = useReducer(appReducer, appReducer());
  const [latestEvent, setLatestEvent] = useState(null);
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const dismissInstructions = () => setInstructionsVisible(false);

  const dispatchCompleteItem = (itemId) => dispatch(completeItem(itemId));
  const dispatchUncheckItem = (itemId) => dispatch(uncheckItem(itemId));
  const dispatchEditItem = (itemId, text) => dispatch(editItem(itemId, text));

  return (
    <AppStateContext.Provider
      value={{
        todoItems,
        addItem: (text) => {
          const action = addItem({ text });
          dispatch(action);
          setLatestEvent({
            type: EventType.ItemAdded,
            data: {
              itemId: action.payload.id,
              text,
            },
          });
          dismissInstructions();
        },
        completeItem: dispatchCompleteItem,
        uncheckItem: dispatchUncheckItem,
        editItem: dispatchEditItem,
        splitItem: (itemId, splitAt) => {
          const action = splitItem(itemId, splitAt);
          dispatch(action);
          setLatestEvent({
            type: EventType.ItemSplit,
            data: {
              splitItemId: itemId,
              newItemId: action.payload.newItemId,
            },
          });
        },
        instructionsVisible,
        dismissInstructions,
        latestEvent,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
