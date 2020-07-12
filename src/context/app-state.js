import React, { createContext, useReducer, useState } from 'react';

import appReducer from './app-reducer';
import {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
  mergeItem,
} from './reducer-actions';

export const AppStateContext = createContext();

export const EventType = {
  ItemAdded: 'itemAdded',
  ItemSplit: 'itemSplit',
  ItemMerged: 'itemMerged',
};

export const AppStateProvider = ({ children }) => {
  const [todoItems, dispatch] = useReducer(appReducer, appReducer());
  const [latestEvent, setLatestEvent] = useState(null);
  const sendEvent = (eventType, data) =>
    setLatestEvent({ type: eventType, data });
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
          sendEvent(EventType.ItemAdded, {
            itemId: action.payload.id,
            text,
          });
          dismissInstructions();
        },
        completeItem: dispatchCompleteItem,
        uncheckItem: dispatchUncheckItem,
        editItem: dispatchEditItem,
        splitItem: (itemId, splitAt) => {
          const action = splitItem(itemId, splitAt);
          dispatch(action);
          sendEvent(EventType.ItemSplit, {
            splitItemId: itemId,
            newItemId: action.payload.newItemId,
          });
        },
        mergeItem: (itemId) => {
          const removedItemIndex = todoItems.items.findIndex(
            (item) => item.id === itemId
          );

          if (removedItemIndex === 0) return;

          dispatch(mergeItem(itemId));
          const mergedIntoItem = todoItems.items[removedItemIndex - 1];
          sendEvent(EventType.ItemMerged, { mergedIntoItem });
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
