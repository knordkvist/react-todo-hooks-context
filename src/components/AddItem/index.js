import React, { useEffect } from 'react';
import { useAppState } from 'context/app-state';
import { focusable } from 'interactions/focusable';
import * as S from './styles';

export default function AddItem() {
  const { addItem } = useAppState();
  const { register, runPendingActions } = focusable('addItem');

  useEffect(() => {
    runPendingActions();
  });

  return (
    <S.AddItem>
      <span className="item-add-img" aria-label="Plus sign" role="img"></span>
      <input
        type="text"
        placeholder="todo..."
        ref={register}
        value=""
        onChange={(event) => addItem(event.target.value)}
        autoFocus
      />
    </S.AddItem>
  );
}
