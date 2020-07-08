import React, {
  useContext,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import ItemList from './ItemList';
import { AppStateContext } from '../context/app-state';
import { AddItem } from './AddItem';

const Focusable = forwardRef(({ items, render }, ref) => {
  const itemRefs = useRef({});
  const setItemRef = (itemId) => (itemRef) =>
    (itemRefs.current[itemId] = itemRef);

  useImperativeHandle(ref, () => ({
    focusTextInput: (itemId) => {
      itemRefs.current[itemId].focusTextInput();
    },
  }));

  return items.map((item) => {
    // Pass a callback ref to the item
    return render(item, { ref: setItemRef(item.id) });
  });
});

export default function ActiveItems() {
  const { state } = useContext(AppStateContext);
  const wrapperRef = useRef();

  // When a new item is added, tell the wrapper to focus that specific input
  useEffect(() => {
    if (state.activeItems.length === 0) return;

    const latestItem = state.activeItems[state.activeItems.length - 1];
    wrapperRef.current.focusTextInput(latestItem.id);
  }, [state.activeItems]);

  return (
    <div data-testid="active-items-container">
      <ItemList
        items={state.activeItems}
        ItemWrapper={(props) => <Focusable {...props} ref={wrapperRef} />}
      >
        <AddItem />
      </ItemList>
    </div>
  );
}
