import React, { useContext } from 'react';
import { AppStateContext } from '../context/app-state';

export function AddItem() {
  const { addItem } = useContext(AppStateContext);

  return (
    <li className="item-add">
      <label>
        <span className="item-add-img" aria-label="Plus sign" role="img"></span>
        <input
          type="text"
          placeholder="todo..."
          value=""
          onChange={(event) => addItem(event.target.value)}
          autoFocus
        />
      </label>
    </li>
  );
}
