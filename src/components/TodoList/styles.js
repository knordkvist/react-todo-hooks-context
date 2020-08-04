import styled from 'styled-components';

export const TodoList = styled.div`
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  min-width: 300px;
  width: 100%;
  max-width: 560px;
  margin-top: 30px;
  background-color: ${(props) => props.theme.backgroundColorPrimary};
  * {
    background-color: ${(props) => props.theme.backgroundColorPrimary};
  }
  > * {
    grid-column: 2;
  }
`;
