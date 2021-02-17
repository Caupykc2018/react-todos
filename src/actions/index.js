import {
  CLEAR_COMPLETED_TODOS,
  CLEAR_NOTIFICATION,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  DELETE_USER,
  DELETE_USERS,
  EDIT_ROLE_USER,
  EDIT_TITLE_TODO,
  GET_ALL_TODOS,
  GET_ALL_USERS,
  LOG_OUT,
  LOGIN,
  REFRESH_TOKEN,
  REGISTER,
  SET_DISABLE_END_DATE,
  SET_DISABLE_START_DATE,
  SET_END_DATE,
  SET_NOTIFICATION,
  SET_SEARCH_TEXT,
  SET_START_DATE,
  SET_USER_TAB,
  TOGGLE_ACTIVE_USER,
  TOGGLE_STATUS_ALL_TODOS,
  TOGGLE_STATUS_TODO,
  UPDATE_TODOS,
  UPDATE_USERS,
} from '../constants';

export const login = (loginValue, password) => ({
  type: LOGIN,
  payload: { login: loginValue, password },
});

export const register = (loginValue, password) => ({
  type: REGISTER,
  payload: { login: loginValue, password },
});

export const refreshToken = () => ({
  type: REFRESH_TOKEN,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const getAllTodos = () => ({
  type: GET_ALL_TODOS,
});

export const createTodo = (title) => ({
  type: CREATE_TODO,
  payload: { title },
});

export const editTitleTodo = (todoId, title) => ({
  type: EDIT_TITLE_TODO,
  payload: { todoId, title },
});

export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: { todoId },
});

export const toggleStatusTodo = (todoId, isCompleted) => ({
  type: TOGGLE_STATUS_TODO,
  payload: { todoId, isCompleted },
});

export const toggleStatusAllTodos = () => ({
  type: TOGGLE_STATUS_ALL_TODOS,
});

export const clearCompletedTodos = () => ({
  type: CLEAR_COMPLETED_TODOS,
});

export const setUserTab = (tab) => ({
  type: SET_USER_TAB,
  payload: { tab },
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const editRoleUser = (userId, role) => ({
  type: EDIT_ROLE_USER,
  payload: { userId, role },
});

export const toggleActiveUser = (userId, isActive) => ({
  type: TOGGLE_ACTIVE_USER,
  payload: { userId, isActive },
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: { userId },
});

export const deleteUsers = (userIds) => ({
  type: DELETE_USERS,
  payload: { userIds },
});

export const deleteTodos = (todoIds) => ({
  type: DELETE_TODOS,
  payload: { todoIds },
});

export const updateUsers = (userIds, isActive, role) => ({
  type: UPDATE_USERS,
  payload: { userIds, isActive, role },
});

export const updateTodos = (todoIds, isCompleted) => ({
  type: UPDATE_TODOS,
  payload: { todoIds, isCompleted },
});

export const setNotification = (notification) => ({
  type: SET_NOTIFICATION,
  payload: { notification },
});

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});

export const setStartDate = (date) => ({
  type: SET_START_DATE,
  payload: { date },
});

export const setEndDate = (date) => ({
  type: SET_END_DATE,
  payload: { date },
});

export const setDisableStartDate = (disabled) => ({
  type: SET_DISABLE_START_DATE,
  payload: { disabled },
});

export const setDisableEndDate = (disabled) => ({
  type: SET_DISABLE_END_DATE,
  payload: { disabled },
});

export const setSearchText = (text) => ({
  type: SET_SEARCH_TEXT,
  payload: { text },
});
