import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const CheckList = styled.ul`
  list-style-type: none;
  padding-left: 16px;

  li {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  li input {
    border: 0;
    font-size: 1rem;
  }

  li input:focus {
    outline: none;
  }

  li label {
    display: flex;
    align-items: center;
  }

  li input[type='checkbox'] {
    flex: none;
  }

  li input[type='text'] {
    margin-left: 12px;
    flex: 1;
  }
`;

export default function ItemList({ items, children, ItemWrapper }) {
  return (
    <CheckList className="check-list">
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
    </CheckList>
  );
}
