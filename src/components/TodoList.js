import React from 'react';
import AppContainer from './AppContainer';
import Header from './Header';
import ActiveItems from './ActiveItems';
import CompletedItems from './CompletedItems';
import Instructions from './Instructions';

export default function TodoList() {
  return (
    <AppContainer>
      <Header />
      <ActiveItems />
      <CompletedItems />
      <Instructions />
    </AppContainer>
  );
}
