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
        empty: completedItems.length === 0,
      })}
    >
      <div className="separator">Completed items</div>
      <ItemList items={completedItems} />
    </div>
  );
}