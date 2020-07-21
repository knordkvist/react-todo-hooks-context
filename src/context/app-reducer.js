import produce from 'immer';

import Todos from '../model/Todos';
import Todo from '../model/Todo';
import {
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
  mergeItem,
} from './reducer-actions';

export default produce((draft, { type, payload = {} } = {}) => {
  const item = draft.items.find((item) => item.id === payload.id);

  switch (type) {
    case addItem.type:
      draft.items.push(new Todo(payload));
      return;
    case completeItem.type:
      item.state = Todo.State.Completed;
      return;
    case uncheckItem.type: {
      item.state = Todo.State.Active;
      return;
    }
    case editItem.type: {
      item.description = payload.description;
      return;
    }
    case splitItem.type: {
      const textLeft = item.description.slice(0, payload.splitAt);
      const textRight = item.description.slice(payload.splitAt);
      const itemIndex = draft.items.indexOf(item);
      item.description = textLeft;
      draft.items.splice(
        itemIndex + 1,
        0,
        new Todo({
          description: textRight,
          id: payload.newItemId,
        })
      );
      return;
    }
    case mergeItem.type: {
      const itemIndex = draft.items.indexOf(item);
      if (itemIndex === 0) return;

      draft.items.splice(itemIndex, 1);
      const prevItem = draft.items[itemIndex - 1];
      prevItem.description += item.description;
      return;
    }
    default:
      return draft;
  }
}, new Todos([]));
