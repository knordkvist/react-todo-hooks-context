const elements = {};
const focusQueue = {};

// Focus actions will be defered until the Item component has re-rendered,
// since we want the Item component's input to be updated _before_ altering the caret position
const enqueueFocusAction = (id, args) => (focusQueue[id] = args);

const deregister = (id) => {
  delete elements[id];
  delete focusQueue[id];
};

function focusElement(id, args) {
  const { caretAt } = args;
  const element = elements[id];
  element.focus();
  if (caretAt !== undefined) {
    element.setSelectionRange(caretAt, caretAt);
  }
}

const register = (id) => (elementRef) => (elements[id] = elementRef);

const runPendingActions = (id) => () => {
  const args = focusQueue[id];
  if (args === undefined) return;

  focusElement(id, args);
  delete focusQueue[id];
};

function focusable(id) {
  return {
    register: register(id),
    runPendingActions: runPendingActions(id),
  };
}

export { enqueueFocusAction, focusable, deregister };
