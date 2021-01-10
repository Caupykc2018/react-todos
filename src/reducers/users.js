const users = (state = [], {type, payload}) => {
  switch (type) {
    case "REGISTRATION_USER":
      return [...state, {id: payload.id, login: payload.login, password: payload.password}];
    default:
      return state;
  }
}

export default users;
