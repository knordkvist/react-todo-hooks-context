import React from 'react';
import './index.css';
import { AppStateProvider } from './context/app-state';
import TodoList from './components/todo-list';

export default function App() {
  return (
    <AppStateProvider>
      <TodoList />
    </AppStateProvider>
  );
}
