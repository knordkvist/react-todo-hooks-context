import React from 'react';

export default function AddItem() {
  return (
    <li className="item-add">
      <label>
        <span role="img" aria-label="Add">
          ➕
        </span>
        <input type="text" placeholder="todo" />
      </label>
    </li>
  );
}
