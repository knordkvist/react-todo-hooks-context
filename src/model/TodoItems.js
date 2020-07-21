import { immerable } from 'immer';
import TodoItem from './TodoItem';

export default class TodoItems {
  constructor(items) {
    this.items = items.map((item) => new TodoItem(item));
  }

  get activeItems() {
    return this.items.filter((item) => item.state === TodoItem.State.Active);
  }

  get completedItems() {
    return this.items.filter((item) => item.state === TodoItem.State.Completed);
  }
}
TodoItems[immerable] = true;
