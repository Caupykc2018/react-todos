import {initialTab} from "./currentTab";
import {initialTodo} from "./todos";

export const registration = (id, login, password) => ({
  type: "REGISTRATION_USER",
  payload: {id, login, password}
})

export const logIn = (user) => ({
  type: "LOG_IN",
  payload: {user}
})

export const logOut = () => ({
  type: "LOG_OUT"
})

export const registrationWithAuth = (login, password) => {
  return (dispatch) => {
    const id = new Date().getTime();
    dispatch(registration(id, login, password));
    dispatch(initialTab(id));
    dispatch(initialTodo(id));
    dispatch(logIn({id, login}));
  }
}

export const setCurrentUser = (id) => {
  return (dispatch, getState) => {
    const {users} = getState();

    dispatch(logIn(users.find(user => user.id === id)));
  }
}
