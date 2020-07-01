import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppStateContext } from '../context/app-state';

export default function ItemList({ items, completed, children }) {
  const { completeItem, uncheckItem } = useContext(AppStateContext);

  function Item({ item }) {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={completed ? true : false}
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
            onChange={() => {}}
          />
        </label>
      </li>
    );
  }

  return (
    <ul className={classNames('check-list', { completed: completed })}>
      {items.map((item) => {
        return <Item item={item} key={item.id} />;
      })}
      {children}
    </ul>
  );
}
