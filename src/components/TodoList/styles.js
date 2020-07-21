import styled from 'styled-components';

export const TodoList = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  padding: 6px 18px;
  border-radius: 4px;
  min-width: 300px;
  width: 100%;
  max-width: 560px;
  margin-top: 30px;
  padding-bottom: ${(props) =>
    props.instructionsVisible ? props.theme.instructionsHeight : false};
  background-color: ${(props) => props.theme.backgroundColorPrimary};
  * {
    background-color: ${(props) => props.theme.backgroundColorPrimary};
  }
`;
