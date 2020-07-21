import { immerable } from 'immer';
import { nextId } from '../context/reducer-actions';

export default class TodoItem {
  constructor({
    description = '',
    state = TodoItem.State.Active,
    id = nextId(),
  }) {
    this.description = description;
    this.state = state;
    this.id = id;
  }

  static State = {
    Active: 'active',
    Completed: 'completed',
  };
}
TodoItem[immerable] = true;
