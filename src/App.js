import React from 'react';
import './index.css';
import Header from './components/header';
import TodoItems from './components/todo-items';
import CompletedItems from './components/completed-items';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <TodoItems />
      <CompletedItems />
    </div>
  );
}
