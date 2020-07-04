import React from 'react';
import Item from './Item';

export default function ItemList({ items, children }) {
  return (
    <ul className="check-list">
      {items.map((item) => {
        return <Item item={item} key={item.id} />;
      })}
      {children}
    </ul>
  );
}
