import styled from 'styled-components';

export const ItemList = styled.ul`
  list-style-type: none;
  padding-left: 16px;

  li {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
    align-items: center;
  }

  li input {
    border: 0;
    font-size: 1rem;
  }

  li input:focus {
    outline: none;
  }

  li input[type='checkbox'] {
    flex: none;
  }

  li input[type='text'] {
    margin-left: 12px;
    flex: 1;
  }
`;
