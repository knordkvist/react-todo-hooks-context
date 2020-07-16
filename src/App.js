import React from 'react';
import { ThemeProvider } from 'styled-components';
import './index.css';
import { AppStateProvider } from './context/app-state';
import TodoList from './components/TodoList';
import theme from './theme';

export default function App() {
  return (
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <TodoList />
      </ThemeProvider>
    </AppStateProvider>
  );
}
