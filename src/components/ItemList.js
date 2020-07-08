import React from 'react';
import Item from './Item';

export default function ItemList({ items, children, ItemWrapper }) {
  return (
    <ul className="check-list">
      {ItemWrapper ? (
        <ItemWrapper
          items={items}
          render={(item, props) => (
            <Item item={item} key={item.id} {...props} />
          )}
        ></ItemWrapper>
      ) : (
        items.map((item) => <Item item={item} key={item.id} />)
      )}
      {children}
    </ul>
  );
}
