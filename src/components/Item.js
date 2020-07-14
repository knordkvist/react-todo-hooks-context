import React, { useContext } from 'react';
import ContextItem from '../context/Item';
import { AppStateContext } from '../context/app-state';
import { useFocusable } from '../interactions/focusable';
const ItemState = ContextItem.State;

export default function Item({ item }) {
  const {
    completeItem,
    uncheckItem,
    editItem,
    splitItem,
    mergeItem,
  } = useContext(AppStateContext);
  const focusable = useFocusable(item.id);

  const onKeyDown = (event) => {
    if (item.state === ItemState.Completed) return;

    switch (event.key) {
      case 'Enter': {
        splitItem(item.id, event.target.selectionStart);
        return;
      }
      case 'Backspace': {
        if (event.target.selectionStart > 0) return;
        mergeItem(item.id);
        return;
      }
      default:
        return;
    }
  };

  return (
    <li className="todo-item" data-testid={item.id}>
      <input
        type="checkbox"
        checked={item.state === ItemState.Completed ? true : undefined}
        aria-label={'Toggle todo'}
        onChange={() =>
          item.state === ItemState.Completed
            ? uncheckItem(item.id)
            : completeItem(item.id)
        }
      />
      <input
        className="item-text-input"
        type="text"
        readOnly={item.state === ItemState.Completed}
        value={item.text}
        ref={focusable}
        data-item-id={item.id}
        onChange={(e) => editItem(item.id, e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
}
