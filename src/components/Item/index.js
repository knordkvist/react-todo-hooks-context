import React, { useState, useEffect } from 'react';
import TodoItem from 'model/TodoItem';
import { useAppState } from 'context/app-state';
import { focusable } from 'interactions/focusable';
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
  const { register, runPendingActions } = focusable(item.id);

  useEffect(() => {
    runPendingActions();
  }, [item.description, runPendingActions]);

  const keyActions = (key) => {
    const actions = {
      Enter: (event) => splitItem(item.id, event.target.selectionStart),
      Backspace: (event) => {
        if (event.target.selectionStart > 0) return;
        mergeItem(item.id);
      },
    };

    if (item.state === TodoItem.State.Completed) return;

    const action = actions[key];
    if (action === undefined) return undefined;

    return (event) => action(event);
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
        ref={register}
        data-item-id={item.id}
        onChange={(e) => {
          editItem(item.id, e.target.value);
        }}
        onKeyDown={(event) => {
          const action = keyActions(event.key);
          if (action === undefined) return;
          action(event);
        }}
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
