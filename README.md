A todo list implemented in React.

A poor man's Redux is implemented using Context (see [app-state.js](https://github.com/knordkvist/react-todo-hooks-context/blob/master/src/context/app-state.js)).
The Context is hosting [a simple reducer](https://github.com/knordkvist/react-todo-hooks-context/blob/master/src/context/app-reducer.js)

Implemented using a test-driven approach with Jest and React Testing Library.

Fancy fade-in effect of completed todo-items courtesy of React Transition Group, implemented using TransitionGroup in [this small wrapper component](https://github.com/knordkvist/react-todo-hooks-context/blob/master/src/components/CompletedItems.js#L43-L51).
