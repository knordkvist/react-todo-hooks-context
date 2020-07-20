import React, { useContext, useEffect } from 'react';
import ItemList from './ItemList';
import { AppStateContext, EventType } from '../context/app-state';
import { AddItem } from './AddItem';
import { focusElement } from '../interactions/focusable';

function Focusable({ items, render }) {
  const { latestEvent } = useContext(AppStateContext);

  // When a new item is added, focus that specific input
  useEffect(() => {
    if (!latestEvent) return;

    const { type: eventType, data: eventData } = latestEvent;
    switch (eventType) {
      case EventType.ItemAdded: {
        focusElement(eventData.itemId, eventData.text.length);
        break;
      }
      case EventType.ItemSplit: {
        focusElement(eventData.newItemId, 0);
        break;
      }
      case EventType.ItemMerged: {
        const item = eventData.mergedIntoItem;
        focusElement(item.id, item.text.length);
        break;
      }
      default:
        break;
    }
  }, [latestEvent]);

  return items.map((item) => render(item));
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
