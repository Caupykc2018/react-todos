import { CLEAR_CURRENT_USER, SET_CURRENT_USER, SET_DATA_CURRENT_USER } from '../constants';

const currentUser = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        token: payload.user.token,
        refreshToken: payload.user.refreshToken,
        login: payload.user.login,
        role: payload.user.role,
        id: payload.user.id,
      };
    case SET_DATA_CURRENT_USER:
      return {
        ...state,
        login: payload.user.login,
        role: payload.user.role,
      };
    case CLEAR_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default currentUser;
