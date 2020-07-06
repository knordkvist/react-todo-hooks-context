import React, { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ItemList from './ItemList';
import classNames from 'classnames';
import { AppStateContext } from '../context/app-state';

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
    state: { completedItems },
  } = useContext(AppStateContext);

  return (
    <div
      data-testid="completed-items-container"
      className={classNames('completed-items-container', {
        hidden: completedItems.length < 1,
      })}
    >
      <div className="separator">
        {completedItems.length} Completed{' '}
        {completedItems.length > 1 ? 'items' : 'item'}
      </div>

      <ItemList items={completedItems} ItemWrapper={FadeIn} />
    </div>
  );
}
