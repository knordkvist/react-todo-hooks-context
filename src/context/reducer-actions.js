import { v4 as uuidv4 } from 'uuid';
import Todo from '../model/Todo';

const nextId = uuidv4;

const addItem = ({
  description = '',
  id = nextId(),
  state = Todo.State.Active,
}) => ({
  type: addItem.type,
  payload: { id, description, state },
});
addItem.type = 'app-state/addItem';

const completeItem = (itemId) => ({
  type: completeItem.type,
  payload: { id: itemId },
});
completeItem.type = 'app-state/completeItem';

const uncheckItem = (itemId) => ({
  type: uncheckItem.type,
  payload: { id: itemId },
});
uncheckItem.type = 'app-state/uncheckItem';

const editItem = (itemId, description) => ({
  type: editItem.type,
  payload: { id: itemId, description },
});
editItem.type = 'app-state/editItem';

const splitItem = (itemId, splitAt, newItemId = nextId()) => ({
  type: splitItem.type,
  payload: { id: itemId, splitAt, newItemId },
});
splitItem.type = 'app-state/splitItem';

const mergeItem = (itemId) => ({
  type: mergeItem.type,
  payload: { id: itemId },
});
mergeItem.type = 'app-state/mergeItem';

export {
  nextId,
  addItem,
  completeItem,
  uncheckItem,
  editItem,
  splitItem,
  mergeItem,
};
