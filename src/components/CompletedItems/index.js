import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ItemList from 'components/ItemList';
import classNames from 'classnames';
import { useAppState } from 'context/app-state';
import * as S from './styles';

const FadeIn = ({ items, render }) => (
  <TransitionGroup component={null}>
    {items.map((item) => (
      <CSSTransition key={item.id} timeout={500} exit={false} classNames="item">
        {render(item)}
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default function CompletedItems() {
  const {
    todoItems: { completedItems },
  } = useAppState();

  return (
    <S.CompletedItems
      data-testid="completed-items-container"
      className={classNames('completed-items-container', {
        hidden: completedItems.length < 1,
      })}
    >
      <S.Separator>
        {completedItems.length} Completed{' '}
        {completedItems.length > 1 ? 'items' : 'item'}
      </S.Separator>

      <ItemList items={[...completedItems].reverse()} ItemWrapper={FadeIn} />
    </S.CompletedItems>
  );
}
