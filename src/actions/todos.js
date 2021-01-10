export const initialTodo = (idUser) => ({
  type: "INITIAL_TODO",
  payload: {idUser}
})

export const addTodo = (idUser, title) => ({
  type: "ADD_TODO",
  payload: {idUser, title}
})

export const removeTodo = (idUser, idTodo) => ({
  type: "REMOVE_TODO",
  payload: {idUser, idTodo}
})

export const editTodo = (idUser, idTodo, title) => ({
  type: "EDIT_TODO",
  payload: {idUser, idTodo, title}
})

export const toggleTodo = (idUser, idTodo) => ({
  type: "TOGGLE_TODO",
  payload: {idUser, idTodo}
})

export const toggleAllTodo = (idUser) => ({
  type: "TOGGLE_ALL_TODO",
  payload: {idUser}
})

export const clearCompletedTodo = (idUser) => ({
  type: "CLEAR_COMPLETED_TODO",
  payload: {idUser}
})

export const addUserTodo = (title) => {
  return (dispatch, getState) => {
    const {currentUser} = getState();

    dispatch(addTodo(currentUser.id, title));
  }
}

export const removeUserTodo = (idTodo) => {
  return (dispatch, getState) => {
    const {currentUser} = getState();

    dispatch(removeTodo(currentUser.id, idTodo));
  }
}

export const editUserTodo = (idTodo, title) => {
  return (dispatch, getState) => {
    const {currentUser} = getState();

    dispatch(editTodo(currentUser.id, idTodo, title));
  }
}

export const toggleUserTodo = (idTodo) => {
  return (dispatch, getState) => {
    const {currentUser} = getState();

    dispatch(toggleTodo(currentUser.id, idTodo));
  }
}

export const toggleAllUserTodo = () => {
  return (dispatch, getState) => {
    const {currentUser} = getState();

    dispatch(toggleAllTodo(currentUser.id));
  }
}

export const clearCompletedUserTodo = () => {
  return (dispatch, getState) => {
    const {currentUser} = getState();

    dispatch(clearCompletedTodo(currentUser.id));
  }
}
