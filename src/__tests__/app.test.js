import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../app';

// Since getting the checkbox associated with an input is a bit flaky we encapsulate that here
// const getCheckBox = (container, input) => {
//   // const sibling = input.previousSibling;
//   // if (sibling.getAttribute('type') != 'checkbox')
//   //   throw 'Could not locate checkbox associated with input';

//   return container.getByTestId(input.dataset.testid);
// };

it('adds an in-progress todo when pressing enter', () => {
  const {
    getByLabelText,
    getByPlaceholderText,
    getByText,
    getByDisplayValue,
    container,
    getByTestId,
  } = render(<App />);

  const newItemInput = getByPlaceholderText('todo...');
  fireEvent.change(newItemInput, { target: { value: 'buy milk' } });
  fireEvent.keyDown(newItemInput, { key: 'Enter', keyCode: 'Enter' });

  const addedItemInput = getByDisplayValue('buy milk');
  const checkBox = getByTestId(addedItemInput.dataset.itemId);
  expect(checkBox.checked).toBe(false);
});
