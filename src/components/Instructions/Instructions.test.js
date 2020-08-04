import React from 'react';
import { render as renderWithoutProvider, fireEvent } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
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

  expect(instructionsContainer()).not.toBeInTheDocument();
});

it('renders correctly', () => {
  const { container } = render(<Instructions />);

  expect(container.firstChild).toMatchInlineSnapshot(`
    .c0 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: space-around;
      -webkit-justify-content: space-around;
      -ms-flex-pack: space-around;
      justify-content: space-around;
      height: 40px;
      width: 100%;
      bottom: 0;
      left: 0;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;
    }

    .c0.c0 {
      grid-column: 1/-1;
      background-color: #fff2ab;
    }

    .c0.c0 * {
      background-color: #fff2ab;
    }

    .c1.c1 {
      right: 5%;
      background-color: #0078d7;
      border-color: #0078d7;
      border: 1.5px solid black;
      cursor: pointer;
      border-radius: 3px;
      color: white;
      padding: 0.2rem 0.55rem;
      font-size: 1rem;
    }

    <div
      class="c0"
      data-testid="instructions-container"
    >
      <div />
      <span>
        Start typing to add a new item
      </span>
      <button
        class="c1"
        type="button"
      >
        Got it!
      </button>
    </div>
  `);
});
