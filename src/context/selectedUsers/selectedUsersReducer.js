import {
  ADD_SELECTED_USER,
  ADD_SELECTED_USERS,
  CLEAR_SELECTED_USERS,
  REMOVE_SELECTED_USER,
  REMOVE_SELECTED_USERS,
} from '../../constants';

export const selectedUsersReducer = (state, { type, payload }) => {
  let copyState = [...state];

  switch (type) {
    case ADD_SELECTED_USERS:
      return [...state, ...payload.users];
    case ADD_SELECTED_USER:
      return [...state, payload.user];
    case REMOVE_SELECTED_USER:
      return state.filter((user) => user.id !== payload.user.id);
    case REMOVE_SELECTED_USERS:
      payload.users.forEach((user) => (copyState = copyState.filter(({ id }) => id !== user.id)));
      return copyState;
    case CLEAR_SELECTED_USERS:
      return [];
    default:
      return state;
  }
};
