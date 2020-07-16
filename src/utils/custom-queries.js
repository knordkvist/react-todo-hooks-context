import { getByPlaceholderText, queryByTestId } from '@testing-library/react';

const newItemInput = (element) => getByPlaceholderText(element, 'todo...');
const completedItemsContainer = (element) =>
  queryByTestId(element, 'completed-items-container');
const activeItemsContainer = (element) =>
  queryByTestId(element, 'active-items-container');
const todoItems = (element) =>
  element.querySelectorAll('.check-list li.todo-item');
const instructionsContainer = (element) =>
  queryByTestId(element, 'instructions-container');

export {
  newItemInput,
  completedItemsContainer,
  activeItemsContainer,
  todoItems,
  instructionsContainer,
};
