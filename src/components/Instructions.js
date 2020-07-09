import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppStateContext } from '../context/app-state';

const DismissButton = styled.button`
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
const Container = styled.div`
  position: absolute;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-around;
  height: var(--instructions-height);
  background-color: var(--background-color-secondary);
  * {
    background-color: var(--background-color-secondary);
  }
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
`;

export default function Instructions() {
  const { instructionsVisible, dismissInstructions } = useContext(
    AppStateContext
  );
  return instructionsVisible ? (
    <Container
      visible={instructionsVisible}
      data-testid="instructions-container"
    >
      <div></div>
      <span>Start typing to add a new item</span>
      <DismissButton type="button" onClick={dismissInstructions}>
        Got it!
      </DismissButton>
    </Container>
  ) : null;
}
