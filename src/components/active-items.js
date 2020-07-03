import React, { useContext, useState } from 'react';
import ItemList from './item-list';
import { AppStateContext } from '../context/app-state';

function AddItem() {
  const { addItem } = useContext(AppStateContext);
  const initialInputText = '';
  const [text, setText] = useState(initialInputText);

  const addItemAndClearInput = (text) => {
    setText(initialInputText);
    addItem(text);
  };

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
          onKeyDown={(event) =>
            event.key === 'Enter' && addItemAndClearInput(text)
          }
          autoFocus
        />
      </label>
    </li>
  );
}

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
