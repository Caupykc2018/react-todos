const users = (state = [], {type, payload}) => {
  switch (type) {
    case "INITIAL_USERS":
        return payload.users;
    case "ADD_USER":
        return [...state, payload.user];
    case "SET_USER":
        state[state.findIndex(user => user._id === payload.user._id)] = {
            ...payload.user,
            isActive: payload.user.isActive,
            role: payload.user.role
        };
        return state;
    case "REMOVE_USER":
        return state.filter(user => user._id !== payload.user._id);
    default:
        return state;
  }
}

export default users;
