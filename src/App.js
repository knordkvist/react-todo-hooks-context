import React from 'react';
import './index.css';
import { AppStateProvider } from './context/app-state';

export default function App() {
  return (
    <AppStateProvider>
      <TodoList></TodoList>
    </AppStateProvider>
  );
}
