import React from 'react';
import Header from './components/header';
import ActiveItems from './components/active-items';
import CompletedItems from './components/completed-items';

export function TodoList() {
  return (
    <div className="app-container">
      <Header />
      <ActiveItems />
      <CompletedItems />
    </div>
  );
}
