import React, { useContext } from 'react';
import ItemList from './ItemList';
import classNames from 'classnames';
import { AppStateContext } from '../context/app-state';

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
      <ItemList items={completedItems} />
    </div>
  );
}
