const todos = (state = {}, {type, payload}) => {
  switch (type) {
    case "INITIAL_TODO":
      return {
        ...state,
        [payload.idUser]: []
      }
    case "ADD_TODO":
      return {
        ...state,
        [payload.idUser]:
          [
            ...state[payload.idUser],
            {
              id: new Date().getTime(),
              title: payload.title,
              isCompleted: false
            }
          ]
      };
    case "REMOVE_TODO":
      return {
        ...state,
        [payload.idUser]: state[payload.idUser].filter(todo => todo.id !== payload.idTodo)
      };
    case "EDIT_TODO":
      state[payload.idUser][state[payload.idUser].findIndex(todo => todo.id === payload.idTodo)].title = payload.title;
      return state;
    case "TOGGLE_TODO":
      const index = state[payload.idUser].findIndex(todo => todo.id === payload.idTodo);
      state[payload.idUser][index].isCompleted = !state[payload.idUser][index].isCompleted;
      return state;
    case "TOGGLE_ALL_TODO":
      const activeTodos = state[payload.idUser].filter(todo => !todo.isCompleted);

      if(activeTodos.length) {
        activeTodos.forEach(todo => todo.isCompleted = !todo.isCompleted);
      }
      else {
        state[payload.idUser].forEach(todo => todo.isCompleted = !todo.isCompleted);
      }

      return state;
    case "CLEAR_COMPLETED_TODO":
      return {
        ...state,
        [payload.idUser]: state[payload.idUser].filter(todo => !todo.isCompleted)
      };
    default:
      return state;
  }
};

export default todos;
