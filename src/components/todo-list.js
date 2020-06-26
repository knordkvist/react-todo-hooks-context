import React from 'react';
import Header from './header';
import ActiveItems from './active-items';
import CompletedItems from './completed-items';

export default function TodoList() {
  return (
    <div className="app-container">
      <Header />
      <ActiveItems />
      <CompletedItems />
    </div>
  );
}
