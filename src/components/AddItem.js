import React from 'react';
import styled from 'styled-components';
import { useAppState } from '../context/app-state';
import { useFocusable } from '../interactions/focusable';

const ListItem = styled.li`
  .item-add-img {
    background: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iIzAwMDAwMCI+CiA8cGF0aCBkPSJtMzggMjZoLTEydjEyaC00di0xMmgtMTJ2LTRoMTJ2LTEyaDR2MTJoMTJ2NHoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K)
      no-repeat center;
    width: 13px;
    height: 13px;
    margin-bottom: 3px;
    margin-left: 4px;
    margin-right: 3px;
    margin-top: 3px;
    opacity: 0.54;
  }
`;

export function AddItem() {
  const { addItem } = useAppState();
  const focusable = useFocusable('addItem');

  return (
    <ListItem>
      <label>
        <span className="item-add-img" aria-label="Plus sign" role="img"></span>
        <input
          type="text"
          placeholder="todo..."
          ref={focusable}
          value=""
          onChange={(event) => addItem(event.target.value)}
          autoFocus
        />
      </label>
    </ListItem>
  );
}
