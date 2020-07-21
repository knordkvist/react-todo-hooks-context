import React from 'react';
import { render as renderWithoutProvider, fireEvent } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Instructions from 'components/Instructions';
import ActiveItems from 'components/ActiveItems';
import { AppStateProvider } from 'context/app-state';

const render = renderWithoutProvider(AppStateProvider);

it('is visible when the app is loaded', () => {
  const { getByText, dismissButton } = render(<Instructions />);

  expect(getByText('Start typing to add a new item')).toBeDefined();
  expect(dismissButton()).toBeInTheDocument();
});

it('can be dismissed by clicking the button', () => {
  const { instructionsContainer, dismissButton } = render(<Instructions />);

  fireEvent.click(dismissButton());

  expect(instructionsContainer()).not.toBeInTheDocument();
});

it('is automatically dismissed when an item is added', async () => {
  const {
    actions: { addItem },
    instructionsContainer,
  } = render(
    <>
      <ActiveItems />
      <Instructions />
    </>
  );

  await addItem('a');

  expect(instructionsContainer()).toBeNull();
});
