import styled from 'styled-components';

const Instructions = styled.div`
  position: absolute;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-around;
  height: ${(props) => props.theme.instructionsHeight};
  && {
    background-color: ${(props) => props.theme.backgroundColorSecondary};
    * {
      background-color: ${(props) => props.theme.backgroundColorSecondary};
    }
  }
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
`;

const Button = styled.button`
  && {
    right: 5%;
    background-color: #0078d7;
    border-color: #0078d7;
    border: 1.5px solid black;
    cursor: pointer;
    border-radius: 3px;
    color: white;
    padding: 0.2rem 0.55rem;
    font-size: 1rem;
  }
`;

export { Instructions, Button };
