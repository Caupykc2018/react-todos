const currentUser = (state = {}, {type, payload}) => {
  switch (type) {
    case "LOG_IN":
      return {id: payload.user.id, login: payload.user.login};
    case "LOG_OUT":
      return {};
    default:
      return state;
  }
}

export default currentUser;
