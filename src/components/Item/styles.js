import styled from 'styled-components';

const Item = styled.li`
  position: relative;
`;

const DeleteButton = styled.button`
  border: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDAwIj4KICA8cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyIDE5IDYuNDF6Ii8+Cjwvc3ZnPgo=);
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-position: center;
  flex: none;
  width: 24px;
  height: 24px;
  opacity: ${(props) => props.theme.secondaryOpacity};
  visibility: hidden;
  ${Item}:hover & {
    visibility: visible;
  }
  visibility: ${(props) => (props.itemFocused ? 'visible' : 'hidden')};
  :hover {
    opacity: 0.87;
    background-color: rgba(95, 99, 104, 0.157);
    border-radius: 50%;
  }
  :focus {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 50%;
  }
`;

export { Item, DeleteButton };
