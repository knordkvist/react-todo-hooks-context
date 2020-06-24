import React from 'react';
import ItemList from './item-list';

export default function TodoItems() {
  const todos = [{ description: 'paint the house', status: 'todo' }];
  return <ItemList items={todos} />;
}
