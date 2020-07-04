import React, { useContext } from 'react';
import { Item as ReducerItem } from '../context/Item';
import { AppStateContext } from '../context/app-state';
const ItemState = ReducerItem.State;

function Item({ item }) {
  const { completeItem, uncheckItem, editItem } = useContext(AppStateContext);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={item.state === ItemState.Completed}
          data-testid={item.id}
          onChange={() =>
            item.state === ItemState.Completed
              ? uncheckItem(item.id)
              : completeItem(item.id)
          }
        />
        <input
          className="item-text-input"
          type="text"
          value={item.text}
          data-item-id={item.id}
          onChange={(e) => editItem(item.id, e.target.value)}
        />
      </label>
    </li>
  );
}

export default function ItemList({ items, children }) {
  return (
    <ul className="check-list">
      {items.map((item) => {
        return <Item item={item} key={item.id} />;
      })}
      {children}
    </ul>
  );
}
