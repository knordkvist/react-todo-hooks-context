import React, { useContext, useState } from 'react';
import ItemList from './item-list';
import { AppStateContext } from '../context/app-state';

export default function ActiveItems() {
  const { activeItems, addItem } = useContext(AppStateContext);

  function AddItem() {
    const [text, setText] = useState('');

    return (
      <li className="item-add">
        <label>
          <span aria-label="Plus sign" role="img">
            ➕
          </span>
          <input
            type="text"
            placeholder="todo..."
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && addItem(text)}
            autoFocus
          />
        </label>
      </li>
    );
  }

  return (
    <ItemList items={activeItems} completed={false}>
      <AddItem />
    </ItemList>
  );
}
