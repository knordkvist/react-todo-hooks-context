import React from 'react';
import ItemList from 'components/ItemList';
import { useAppState } from 'context/app-state';
import AddItem from 'components/AddItem';

export default function ActiveItems() {
  const { todoItems } = useAppState();

  return (
    <div data-testid="active-items-container">
      <ItemList items={todoItems.activeItems}>
        <AddItem />
      </ItemList>
    </div>
  );
}
