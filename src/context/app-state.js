import React, { createContext, useReducer, useState, useContext } from 'react';

import appReducer from './app-reducer';
import * as actions from './reducer-actions';
import { enqueueFocusAction, deregister } from 'interactions/focusable';

const state = { todoItems: appReducer(), instructionsVisible: true };
const AppStateContext = createContext();

const EventType = {
  ItemAdded: 'itemAdded',
  ItemSplit: 'itemSplit',
  ItemMerged: 'itemMerged',
  ItemDeleted: 'itemDeleted',
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

function setupFocusAction(eventType, eventData) {
  switch (eventType) {
    case EventType.ItemAdded: {
      enqueueFocusAction(eventData.itemId, {
        caretAt: eventData.description.length,
      });
      break;
    }
    case EventType.ItemSplit: {
      enqueueFocusAction(eventData.newItemId, { caretAt: 0 });
      break;
    }
    case EventType.ItemMerged: {
      const item = eventData.mergedIntoItem;
      enqueueFocusAction(item.id, { caretAt: item.description.length });
      break;
    }
    case EventType.ItemDeleted: {
      deregister(eventData.itemId);
      break;
    }
    default:
      break;
  }
}

const AppStateProvider = ({ initialState = state, children }) => {
  const [todoItems, dispatch] = useReducer(appReducer, initialState.todoItems);
  const [instructionsVisible, setInstructionsVisible] = useState(
    initialState.instructionsVisible
  );

  const dismissInstructions = () => setInstructionsVisible(false);
  const completeItem = (itemId) => dispatch(actions.completeItem(itemId));
  const uncheckItem = (itemId) => dispatch(actions.uncheckItem(itemId));
  const editItem = (itemId, description) =>
    dispatch(actions.editItem(itemId, description));
  const addItem = (description) => {
    const action = actions.addItem({ description });
    dispatch(action);
    setupFocusAction(EventType.ItemAdded, {
      itemId: action.payload.id,
      description,
    });
    dismissInstructions();
  };
  const splitItem = (itemId, splitAt) => {
    const action = actions.splitItem(itemId, splitAt);
    dispatch(action);
    setupFocusAction(EventType.ItemSplit, {
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
    setupFocusAction(EventType.ItemMerged, { mergedIntoItem });
  };

  const deleteItem = (itemId) => {
    dispatch(actions.deleteItem(itemId));
    setupFocusAction(EventType.ItemDeleted, { itemId });
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
        deleteItem,
        instructionsVisible,
        dismissInstructions,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { EventType, AppStateProvider, useAppState };
