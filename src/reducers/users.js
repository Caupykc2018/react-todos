import {
  ADD_USER,
  CLEAR_USERS,
  INITIAL_USERS,
  REMOVE_USER,
  REMOVE_USERS,
  SET_USER,
  SET_USERS,
} from '../constants';

const users = (state = [], { type, payload }) => {
  let copyState = [...state];

  switch (type) {
    case INITIAL_USERS:
      return payload.users;
    case CLEAR_USERS:
      return [];
    case ADD_USER:
      return [...state, payload.user];
    case SET_USER:
      copyState[copyState.findIndex((user) => user.id === payload.user.id)] = payload.user;
      return copyState;
    case SET_USERS:
      payload.users.forEach((payloadUser) => {
        const index = copyState.findIndex((user) => user.id === payloadUser.id);

        copyState[index] = payloadUser;
      });
      return copyState;
    case REMOVE_USER:
      return state.filter((user) => user.id !== payload.user.id);
    case REMOVE_USERS:
      payload.users.forEach((user) => {
        copyState = copyState.filter(({ id }) => id !== user.id);
      });
      return copyState;
    default:
      return state;
  }
};

export default users;
