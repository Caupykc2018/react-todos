const todos = (state = {}, {type, payload}) => {
  switch (type) {
    case "INITIAL_TODOS":
        return payload.todos.map(todo => ({...todo, isEdit: false}))
    case "ADD_TODO":
        return [...state, {...payload.todo, isEdit: false}];
    case "SET_TODO":
        state[state.findIndex(todo => todo._id === payload.todo._id)] = {
            ...payload.todo,
            title: payload.todo.title,
            isCompleted: payload.todo.isCompleted
        };
        return state;
    case "SET_TODOS":
        payload.todos.forEach(payloadTodo => {
            const index = state.findIndex(todo => todo._id === payloadTodo._id);

            state[index] = {
                ...state[index],
                title: payloadTodo.title,
                isCompleted: payloadTodo.isCompleted
            };
        });
        return state;
    case "REMOVE_TODO":
        return state.filter(todo => todo._id !== payload.todo._id);
    case "REMOVE_TODOS":
        let editListTodos = [...state];
        payload.todos.forEach(todo => {
            editListTodos = editListTodos.filter(({_id}) => _id !== todo._id);
        })
        return editListTodos;
    case "TOGGLE_EDIT_STATUS_TODO":
        const index = state.findIndex(todo => todo._id === payload.id);
        state[index] = {
            ...state[index],
            isEdit: !state[index].isEdit
        }
        return state;
    default:
        return state;
  }
};

export default todos;
