import React from 'react';
import './index.css';
import { AppStateProvider } from './context/app-state';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import ActiveItems from './components/ActiveItems';
import CompletedItems from './components/CompletedItems';
import Instructions from './components/Instructions';

export default function App() {
  return (
    <AppStateProvider>
      <AppContainer>
        <Header />
        <ActiveItems />
        <CompletedItems />
        <Instructions />
      </AppContainer>
    </AppStateProvider>
  );
}
