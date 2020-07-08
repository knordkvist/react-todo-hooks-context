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
  const { completeItem, uncheckItem, editItem } = useContext(AppStateContext);
  const textInputRef = useRef();
  const focusTextInput = () => textInputRef.current.focus();
  // Expose an object containing our focusTextInput method
  useImperativeHandle(ref, () => ({ focusTextInput }));

  return (
    <li className="todo-item">
      <label>
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
        />
      </label>
    </li>
  );
}

export default forwardRef(Item);
