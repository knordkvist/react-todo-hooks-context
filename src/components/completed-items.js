import React from 'react';
import ItemList from './item-list';

export default function CompletedItems() {
  const completed = [{ description: 'buy milk', status: 'completed' }];
  return (
    <div
      className="completed-items-container"
      data-has-items={completed.length > 0}
    >
      <div className="separator">Completed items</div>
      <ItemList items={completed} />
    </div>
  );
}
