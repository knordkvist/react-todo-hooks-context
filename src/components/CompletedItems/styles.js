import styled from 'styled-components';

const CompletedItems = styled.div`
  ul.check-list .item-description-input {
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

export { CompletedItems, Separator };
