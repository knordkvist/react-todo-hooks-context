import { immerable } from 'immer';
import { nextId } from '../context/reducer-actions';

export default class Todo {
  constructor({ text = '', state = Todo.State.Active, id = nextId() }) {
    this.text = text;
    this.state = state;
    this.id = id;
  }

  static State = {
    Active: 'active',
    Completed: 'completed',
  };
}
Todo[immerable] = true;
