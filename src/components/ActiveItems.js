import React, { useContext } from 'react';
import ItemList from './ItemList';
import { AppStateContext } from '../context/app-state';
import { AddItem } from './AddItem';

export default function ActiveItems() {
  const { state } = useContext(AppStateContext);

  return (
    <div data-testid="active-items-container">
      <ItemList items={state.activeItems}>
        <AddItem />
      </ItemList>
    </div>
  );
}
