A todo list implemented in React.

A poor man's Redux is implemented using Context (see [app-state.js](https://github.com/knordkvist/react-todo-hooks-context/blob/master/src/context/app-state.js)).
The Context is hosting [a simple reducer](https://github.com/knordkvist/react-todo-hooks-context/blob/master/src/context/app-reducer.js) which makes use of Immer to simplify our state creation (Immer was introduced in [this commit](https://github.com/knordkvist/react-todo-hooks-context/commit/e07862b596914c6bced03b3ccb5a2cb4e7e320b3)).

Implemented using a test-driven approach with Jest and React Testing Library.

Fancy fade-in effect of completed todo-items courtesy of React Transition Group, implemented using TransitionGroup in [this small wrapper component](https://github.com/knordkvist/react-todo-hooks-context/blob/master/src/components/CompletedItems.js#L7-L15).
