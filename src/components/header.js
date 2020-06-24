import React from 'react';

export default function Header() {
  return (
    <h1>
      Todo{' '}
      <span role="img" aria-label="Ticked checkbox">
        ☑️
      </span>
    </h1>
  );
}
