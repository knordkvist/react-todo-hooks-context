import React from 'react';
import Item from 'components/Item';
import * as S from './styles';

export default function ItemList({ items, children, ItemWrapper }) {
  return (
    <S.ItemList className="check-list">
      {ItemWrapper ? (
        <ItemWrapper
          items={items}
          render={(item, props = {}) => (
            <Item item={item} key={item.id} {...props} />
          )}
        ></ItemWrapper>
      ) : (
        items.map((item) => <Item item={item} key={item.id} />)
      )}
      {children}
    </S.ItemList>
  );
}
