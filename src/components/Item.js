import React, {
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ContextItem from '../context/Item';
import { AppStateContext } from '../context/app-state';
const ItemState = ContextItem.State;

function Item({ item }, ref) {
  const {
    completeItem,
    uncheckItem,
    editItem,
    splitItem,
    mergeItem,
  } = useContext(AppStateContext);
  const textInputRef = useRef();
  const focusTextInput = (caretAt) => {
    textInputRef.current.focus();
    textInputRef.current.setSelectionRange(caretAt, caretAt);
  };
  // Expose an object containing our focusTextInput method
  useImperativeHandle(ref, () => ({ focusTextInput }));

  const onKeyDown = (event) => {
    if (item.state === ItemState.Completed) return;

    switch (event.key) {
      case 'Enter': {
        splitItem(item.id, event.target.selectionStart);
        return;
      }
      case 'Backspace': {
        if (event.target.selectionStart > 0) return;
        mergeItem(item.id);
        return;
      }
      default:
        return;
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={item.state === ItemState.Completed}
        data-testid={item.id}
        onChange={() =>
          item.state === ItemState.Completed
            ? uncheckItem(item.id)
            : completeItem(item.id)
        }
      />
      <input
        className="item-text-input"
        type="text"
        value={item.text}
        ref={textInputRef}
        data-item-id={item.id}
        onChange={(e) => editItem(item.id, e.target.value)}
        onKeyDown={onKeyDown}
      />
    </li>
  );
}

export default forwardRef(Item);
