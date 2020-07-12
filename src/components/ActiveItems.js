import React, { useContext, useRef, useEffect } from 'react';
import ItemList from './ItemList';
import { AppStateContext, EventType } from '../context/app-state';
import { AddItem } from './AddItem';

function Focusable({ items, render }) {
  const { latestEvent } = useContext(AppStateContext);
  const itemRefs = useRef({});
  const setItemRef = (itemId) => (itemRef) =>
    (itemRefs.current[itemId] = itemRef);

  // When a new item is added, focus that specific input
  useEffect(() => {
    if (!latestEvent) return;

    const { type: eventType, data: eventData } = latestEvent;
    switch (eventType) {
      case EventType.ItemAdded: {
        const itemRef = itemRefs.current[eventData.itemId];
        // The item was created by typing text into the new item input, move caret to end of text
        itemRef.focusTextInput(eventData.text.length);
        break;
      }
      case EventType.ItemSplit: {
        const itemRef = itemRefs.current[eventData.newItemId];
        // The item was added by splitting an existing item so we want to focus the start of the input, where the user left off
        itemRef.focusTextInput(0);
        break;
      }
      case EventType.ItemMerged: {
        const item = eventData.mergedIntoItem;
        const itemRef = itemRefs.current[item.id];
        // Two items were merged into one, set caret between the two texts
        itemRef.focusTextInput(item.text.length);
        break;
      }
      default:
        break;
    }
  }, [latestEvent]);

  return items.map((item) => {
    // Pass a callback ref to the item
    return render(item, { ref: setItemRef(item.id) });
  });
}

export default function ActiveItems() {
  const { todoItems } = useContext(AppStateContext);

  return (
    <div data-testid="active-items-container">
      <ItemList items={todoItems.activeItems} ItemWrapper={Focusable}>
        <AddItem />
      </ItemList>
    </div>
  );
}
