import React, { useContext } from 'react';
import ItemList from './item-list';
import classNames from 'classnames';
import { AppStateContext } from '../context/app-state';

export default function CompletedItems() {
  const { completedItems } = useContext(AppStateContext);
  return (
    <div
      data-testid="completed-items-container"
      className={classNames('completed-items-container', {
        empty: completedItems.length === 0,
      })}
    >
      <div className="separator">Completed items</div>
      <ItemList items={completedItems} completed={true} />
    </div>
  );
}
