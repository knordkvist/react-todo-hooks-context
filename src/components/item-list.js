import React from 'react';

export default function ItemList({ items }) {
  function Item({ item }) {
    return (
      <li className={item.status === 'todo' ? 'item-todo' : 'item-completed'}>
        <label>
          <input
            type="checkbox"
            checked={item.status === 'completed' ? true : false}
          />
          <input type="text" value={item.description} />
        </label>
      </li>
    );
  }

  return (
    <ul className="check-list">
      {items.map((item) => {
        return <Item item={item} />;
      })}
      <li className="item-add">
        <label>
          <span role="img" aria-label="Add">
            ➕
          </span>
          <input type="text" placeholder="todo" />
        </label>
      </li>
    </ul>
  );
}
