import React from 'react';
import { useAppState } from 'context/app-state';
import { useFocusable } from 'interactions/focusable';
import * as S from './styles';

export default function AddItem() {
  const { addItem } = useAppState();
  const focusable = useFocusable('addItem');

  return (
    <S.AddItem>
      <span className="item-add-img" aria-label="Plus sign" role="img"></span>
      <input
        type="text"
        placeholder="todo..."
        ref={focusable}
        value=""
        onChange={(event) => addItem(event.target.value)}
        autoFocus
      />
    </S.AddItem>
  );
}
