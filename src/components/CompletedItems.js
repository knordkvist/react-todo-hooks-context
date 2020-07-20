import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ItemList from './ItemList';
import classNames from 'classnames';
import { useAppState } from '../context/app-state';

const Container = styled.div`
  ul.check-list .item-text-input {
    text-decoration: line-through;
    color: gray;
  }

  .item-enter {
    opacity: 0;
  }

  .item-enter.item-enter-active {
    opacity: 1;
    transition: 500ms ease-in;
  }
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: gray;
  ::before,
  ::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid gray;
  }
  ::before {
    margin-right: 0.25em;
  }
  ::after {
    margin-left: 0.25em;
  }
`;

const FadeIn = ({ items, render }) => (
  <TransitionGroup component={null}>
    {items.map((item) => (
      <CSSTransition key={item.id} timeout={500} exit={false} classNames="item">
        {render(item)}
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default function CompletedItems() {
  const {
    todoItems: { completedItems },
  } = useAppState();

  return (
    <Container
      data-testid="completed-items-container"
      className={classNames('completed-items-container', {
        hidden: completedItems.length < 1,
      })}
    >
      <Separator>
        {completedItems.length} Completed{' '}
        {completedItems.length > 1 ? 'items' : 'item'}
      </Separator>

      <ItemList items={[...completedItems].reverse()} ItemWrapper={FadeIn} />
    </Container>
  );
}
