import { immerable } from 'immer';
import Item from './Item';

export default class Items {
  constructor(items) {
    this.items = items.map((item) => new Item(item));
  }

  get activeItems() {
    return this.items.filter((item) => item.state === Item.State.Active);
  }

  get completedItems() {
    return this.items.filter((item) => item.state === Item.State.Completed);
  }
}
Items[immerable] = true;
