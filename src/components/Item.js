import React from 'react';
import Todo from '../model/Todo';
import { useAppState } from '../context/app-state';
import { useFocusable } from '../interactions/focusable';

export default function Item({ item }) {
  const {
    completeItem,
    uncheckItem,
    editItem,
    splitItem,
    mergeItem,
  } = useAppState();
  const focusable = useFocusable(item.id);

  const onKeyDown = (event) => {
    if (item.state === Todo.State.Completed) return;

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
        checked={item.state === Todo.State.Completed ? true : undefined}
        aria-label={'Toggle todo'}
        onChange={() =>
          item.state === Todo.State.Completed
            ? uncheckItem(item.id)
            : completeItem(item.id)
        }
      />
      <input
        className="item-text-input"
        aria-label={'Todo description'}
        type="text"
        readOnly={item.state === Todo.State.Completed}
        value={item.text}
        ref={focusable}
        data-item-id={item.id}
        onChange={(e) => editItem(item.id, e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
}
