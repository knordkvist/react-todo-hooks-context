import React from 'react';
import './index.css';
import { AppStateProvider } from './context/app-state';
import Header from './components/header';
import ActiveItems from './components/active-items';
import CompletedItems from './components/completed-items';

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
