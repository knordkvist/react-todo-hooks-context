import { immerable } from 'immer';
import Todo from './Todo';

export default class Todos {
  constructor(items) {
    this.items = items.map((item) => new Todo(item));
  }

  get activeItems() {
    return this.items.filter((item) => item.state === Todo.State.Active);
  }

  get completedItems() {
    return this.items.filter((item) => item.state === Todo.State.Completed);
  }
}
Todos[immerable] = true;
