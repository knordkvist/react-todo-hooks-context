import React, { useContext, useRef, useEffect } from 'react';
import ItemList from './ItemList';
import { AppStateContext } from '../context/app-state';
import { AddItem } from './AddItem';

function Focusable({ items, render }) {
  const { state } = useContext(AppStateContext);
  const itemRefs = useRef({});
  const setItemRef = (itemId) => (itemRef) =>
    (itemRefs.current[itemId] = itemRef);

  // When a new item is added, focus that specific input
  useEffect(() => {
    if (state.activeItems.length === 0) return;

    const { id: itemId } = state.activeItems[state.activeItems.length - 1];
    itemRefs.current[itemId].focusTextInput(itemId);
  }, [state.activeItems]);

  return items.map((item) => {
    // Pass a callback ref to the item
    return render(item, { ref: setItemRef(item.id) });
  });
}

export default function ActiveItems() {
  const { state } = useContext(AppStateContext);

  return (
    <div data-testid="active-items-container">
      <ItemList items={state.activeItems} ItemWrapper={Focusable}>
        <AddItem />
      </ItemList>
    </div>
  );
}
