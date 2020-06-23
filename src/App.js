import React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>☑️ Todo</h1>
      <div>
        <ul className="check-list">
          <li>
            <label>
              <input type="checkbox" checked={false} />
              <input type="text" value="paint the house" />
            </label>
          </li>
          <li className="new">
            <label>
              <span>➕</span>
              <input type="text" placeholder="todo" />
            </label>
          </li>
        </ul>
        <div className="separator">Completed items</div>
        <ul className="check-list">
          <li className="completed">
            <label>
              <input type="checkbox" checked={true} />
              <input type="text" value="buy milk" />
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
