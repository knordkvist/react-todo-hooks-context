import {
  queryByPlaceholderText,
  queryByTestId,
  queryByLabelText,
  queryByText,
} from '@testing-library/react';

const newItemInput = (element) => queryByPlaceholderText(element, 'todo...');
const completedItemsContainer = (element) =>
  queryByTestId(element, 'completed-items-container');
const activeItemsContainer = (element) =>
  queryByTestId(element, 'active-items-container');
const todoItems = (element) =>
  element.querySelectorAll('.check-list li.todo-item');
const instructionsContainer = (element) =>
  queryByTestId(element, 'instructions-container');
const todoItemContainer = (element, itemId) =>
  queryByTestId(element, itemId.toString());
const toggleCheckbox = (element, itemId) =>
  queryByLabelText(todoItemContainer(element, itemId), 'Toggle todo');
const descriptionInput = (element, itemId) =>
  queryByLabelText(todoItemContainer(element, itemId), 'Todo description');
const dismissButton = (element) => queryByText(element, 'Got it!');
const deleteButton = (element, elementId) =>
  queryByLabelText(todoItemContainer(element, elementId), 'Delete todo');

export {
  newItemInput,
  completedItemsContainer,
  activeItemsContainer,
  todoItems,
  instructionsContainer,
  todoItemContainer,
  toggleCheckbox,
  descriptionInput,
  dismissButton,
  deleteButton,
};
