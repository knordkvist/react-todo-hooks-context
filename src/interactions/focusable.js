import { curry } from 'ramda';

const elements = {};

function focusElement(id, caretAt) {
  const element = elements[id];
  element.focus();
  if (caretAt !== undefined) {
    element.setSelectionRange(caretAt, caretAt);
  }
}

const register = curry((id, element) => (elements[id] = element));

function useFocusable(id) {
  return register(id);
}

export { focusElement, useFocusable };
