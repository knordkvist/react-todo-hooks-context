import React, { useState } from 'react';
import TodoItem from 'model/TodoItem';
import { useAppState } from 'context/app-state';
import { useFocusable } from 'interactions/focusable';
import * as S from './styles';

export default function Item({ item }) {
  const {
    completeItem,
    uncheckItem,
    editItem,
    splitItem,
    mergeItem,
    deleteItem,
  } = useAppState();
  const [itemFocused, setItemFocused] = useState(false);
  const focusable = useFocusable(item.id);

  const onKeyDown = (event) => {
    if (item.state === TodoItem.State.Completed) return;

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
    <S.Item className="todo-item" data-testid={item.id}>
      <input
        type="checkbox"
        checked={item.state === TodoItem.State.Completed ? true : undefined}
        aria-label={'Toggle todo'}
        onChange={() =>
          item.state === TodoItem.State.Completed
            ? uncheckItem(item.id)
            : completeItem(item.id)
        }
      />
      <input
        className="item-description-input"
        aria-label={'Todo description'}
        type="text"
        readOnly={item.state === TodoItem.State.Completed}
        value={item.description}
        ref={focusable}
        data-item-id={item.id}
        onChange={(e) => editItem(item.id, e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setItemFocused(true)}
        onBlur={() => setItemFocused(false)}
      />
      <S.DeleteButton
        type="button"
        aria-label="Delete todo"
        onClick={() => deleteItem(item.id)}
        itemFocused={itemFocused}
      ></S.DeleteButton>
    </S.Item>
  );
}
