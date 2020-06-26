import React from 'react';
import classNames from 'classnames';

export default function ItemList({ items, completed, children }) {
  function Item({ item }) {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={completed ? true : false}
            data-testid={item.id}
          />
          <input type="text" value={item.text} data-item-id={item.id} />
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
