const currentUser = (state = {}, {type, payload}) => {
  switch (type) {
    case "SET_CURRENT_USER":
      return {
          token: payload.user.token,
          refreshToken: payload.user.refreshToken,
          login: payload.user.login,
          role: payload.user.role
      };
    case "SET_TOKENS_USER":
      return {
          ...state,
          token: payload.user.token,
          refreshToken: payload.user.refreshToken
      };
    case "LOG_OUT":
      return {}
    default:
      return state;
  }
}

export default currentUser;
