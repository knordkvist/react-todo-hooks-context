import React from 'react';
import { ThemeProvider } from 'styled-components';
import './index.css';
import { AppStateProvider } from './context/app-state';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import ActiveItems from './components/ActiveItems';
import CompletedItems from './components/CompletedItems';
import Instructions from './components/Instructions';

const theme = {
  instructionsHeight: '40px',
  backgroundColorPrimary: '#fff7d1',
  backgroundColorSecondary: '#fff2ab',
};

export default function App() {
  return (
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          <ActiveItems />
          <CompletedItems />
          <Instructions />
        </AppContainer>
      </ThemeProvider>
    </AppStateProvider>
  );
}
