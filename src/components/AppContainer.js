import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppStateContext } from '../context/app-state';

const AppContainer = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  padding: 6px 18px;
  border-radius: 4px;
  min-width: 350px;
  margin-top: 30px;
  padding-bottom: ${(props) =>
    props.instructionsVisible ? 'var(--instructions-height)' : false};
  background-color: var(--background-color-primary);
  * {
    background-color: var(--background-color-primary);
  }
`;

export default ({ children }) => {
  const { instructionsVisible } = useContext(AppStateContext);
  return (
    <AppContainer instructionsVisible={instructionsVisible}>
      {children}
    </AppContainer>
  );
};
