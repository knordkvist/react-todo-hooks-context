import { immerable } from 'immer';
import { nextId } from '../context/reducer-actions';

export default class Item {
  constructor({ text = '', state = Item.State.Active, id = nextId() }) {
    this.text = text;
    this.state = state;
    this.id = id;
  }

  static State = {
    Active: 'active',
    Completed: 'completed',
  };
}
Item[immerable] = true;