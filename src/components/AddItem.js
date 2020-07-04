import React, { useContext, useState } from 'react';
import { AppStateContext } from '../context/app-state';

export function AddItem() {
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
        <span className="item-add-img" aria-label="Plus sign" role="img"></span>
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
