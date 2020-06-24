import React, { useContext } from 'react';
import ItemList from './item-list';
import AddItem from './add-item';
import { AppStateContext } from '../context/app-state';

export default function TodoItems() {
  const { todoItems } = useContext(AppStateContext);

  return (
    <ItemList items={todoItems}>
      <AddItem />
    </ItemList>
  );
}
