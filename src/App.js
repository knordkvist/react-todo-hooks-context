import React from 'react';
import './index.css';
import { AppStateProvider } from './context/app-state';
import Header from './components/Header';
import ActiveItems from './components/ActiveItems';
import CompletedItems from './components/CompletedItems';

export default function App() {
  return (
    <AppStateProvider>
      <div className="app-container">
        <Header />
        <ActiveItems />
        <CompletedItems />
      </div>
    </AppStateProvider>
  );
}
