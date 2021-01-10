const currentTab = (state = {}, {type, payload}) => {
  switch (type) {
    case "INITIAL_TAB":
      return {...state, [payload.idUser]: "ALL"}
    case "SET_TAB":
      return {...state, [payload.idUser]: payload.tab};
    default:
      return state;
  }
}

export default currentTab;
