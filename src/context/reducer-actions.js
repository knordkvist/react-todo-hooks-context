import { v4 as uuidv4 } from 'uuid';
import Item from './Item';

export const nextId = uuidv4;

export const addItem = ({
  text = '',
  id = nextId(),
  state = Item.State.Active,
}) => ({
  type: addItem.type,
  payload: { id, text, state },
});
addItem.type = 'app-state/addItem';

export const completeItem = (itemId) => ({
  type: completeItem.type,
  payload: { id: itemId },
});
completeItem.type = 'app-state/completeItem';

export const uncheckItem = (itemId) => ({
  type: uncheckItem.type,
  payload: { id: itemId },
});
uncheckItem.type = 'app-state/uncheckItem';

export const editItem = (itemId, text) => ({
  type: editItem.type,
  payload: { id: itemId, text },
});
editItem.type = 'app-state/editItem';

export const splitItem = (itemId, splitAt, newItemId = nextId()) => ({
  type: splitItem.type,
  payload: { id: itemId, splitAt, newItemId },
});
splitItem.type = 'app-state/splitItem';

export const mergeItem = (itemId) => ({
  type: mergeItem.type,
  payload: { id: itemId },
});
mergeItem.type = 'app-state/mergeItem';
