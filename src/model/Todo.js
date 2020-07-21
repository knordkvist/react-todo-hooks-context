import { immerable } from 'immer';
import { nextId } from '../context/reducer-actions';

export default class Todo {
  constructor({ description = '', state = Todo.State.Active, id = nextId() }) {
    this.description = description;
    this.state = state;
    this.id = id;
  }

  static State = {
    Active: 'active',
    Completed: 'completed',
  };
}
Todo[immerable] = true;
