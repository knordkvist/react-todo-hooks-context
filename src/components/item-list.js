import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppStateContext } from '../context/app-state';

function Item({ item, completed }) {
  const { completeItem, uncheckItem, editItem } = useContext(AppStateContext);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed === true}
          data-testid={item.id}
          onChange={() =>
            completed ? uncheckItem(item.id) : completeItem(item.id)
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

export default function ItemList({ items, completed, children }) {
  return (
    <ul className={classNames('check-list', { completed: completed })}>
      {items.map((item) => {
        return <Item item={item} key={item.id} completed={completed} />;
      })}
      {children}
    </ul>
  );
}
