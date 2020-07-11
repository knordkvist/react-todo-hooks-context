import produce from 'immer';

import Items from './Items';
import Item from './Item';
import {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
} from './reducer-actions';

export default produce((draft, { type, payload } = {}) => {
  const set = (setter) => {
    const item = find();
    setter(item);
  };

  const find = (itemId = payload.id) =>
    draft.items.find((item) => item.id === itemId);

  switch (type) {
    case addItem.type:
      draft.items.push(new Item(payload));
      return;
    case completeItem.type:
      set((item) => (item.state = Item.State.Completed));
      return;
    case uncheckItem.type: {
      set((item) => (item.state = Item.State.Active));
      return;
    }
    case editItem.type: {
      set((item) => (item.text = payload.text));
      return;
    }
    case splitItem.type: {
      const item = find();
      const textLeft = item.text.slice(0, payload.splitAt);
      const textRight = item.text.slice(payload.splitAt);
      const itemIndex = draft.items.indexOf(item);
      set((item) => (item.text = textLeft));
      draft.items.splice(
        itemIndex + 1,
        0,
        new Item({
          text: textRight,
          id: payload.newItemId,
        })
      );
      return;
    }
    default:
      return draft;
  }
}, new Items([]));
