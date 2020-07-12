import React, { createContext, useReducer, useState } from 'react';

import appReducer from './app-reducer';
import * as actions from './reducer-actions';

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
  const completeItem = (itemId) => dispatch(actions.completeItem(itemId));
  const uncheckItem = (itemId) => dispatch(actions.uncheckItem(itemId));
  const editItem = (itemId, text) => dispatch(actions.editItem(itemId, text));
  const addItem = (text) => {
    const action = actions.addItem({ text });
    dispatch(action);
    sendEvent(EventType.ItemAdded, {
      itemId: action.payload.id,
      text,
    });
    dismissInstructions();
  };
  const splitItem = (itemId, splitAt) => {
    const action = actions.splitItem(itemId, splitAt);
    dispatch(action);
    sendEvent(EventType.ItemSplit, {
      splitItemId: itemId,
      newItemId: action.payload.newItemId,
    });
  };
  const mergeItem = (itemId) => {
    const removedItemIndex = todoItems.items.findIndex(
      (item) => item.id === itemId
    );

    if (removedItemIndex === 0) return;

    dispatch(actions.mergeItem(itemId));
    const mergedIntoItem = todoItems.items[removedItemIndex - 1];
    sendEvent(EventType.ItemMerged, { mergedIntoItem });
  };

  return (
    <AppStateContext.Provider
      value={{
        todoItems,
        addItem,
        completeItem,
        uncheckItem,
        editItem,
        splitItem,
        mergeItem,
        instructionsVisible,
        dismissInstructions,
        latestEvent,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
