import React from 'react';
import { useAppState } from 'context/app-state';
import * as S from './styles';

export default function Instructions() {
  const { instructionsVisible, dismissInstructions } = useAppState();
  return instructionsVisible ? (
    <S.Instructions
      visible={instructionsVisible}
      data-testid="instructions-container"
    >
      <div></div>
      <span>Start typing to add a new item</span>
      <S.Button type="button" onClick={dismissInstructions}>
        Got it!
      </S.Button>
    </S.Instructions>
  ) : null;
}
