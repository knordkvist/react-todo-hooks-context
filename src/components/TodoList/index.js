import React from 'react';
import { useAppState } from 'context/app-state';
import Header from 'components/Header';
import ActiveItems from 'components/ActiveItems';
import CompletedItems from 'components/CompletedItems';
import Instructions from 'components/Instructions';
import * as S from './styles';

export default function TodoList() {
  const { instructionsVisible } = useAppState();

  return (
    <S.TodoList instructionsVisible={instructionsVisible}>
      <Header />
      <ActiveItems />
      <CompletedItems />
      <Instructions />
    </S.TodoList>
  );
}
