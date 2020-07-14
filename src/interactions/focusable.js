import { curry } from 'ramda';

const elements = {};

export function focusElement(id, caretAt) {
  const element = elements[id];
  element.focus();
  if (caretAt !== undefined) {
    element.setSelectionRange(caretAt, caretAt);
  }
}

const register = curry((id, element) => (elements[id] = element));

export function useFocusable(id) {
  return register(id);
}
