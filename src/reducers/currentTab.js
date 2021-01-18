const currentTab = (state = {}, {type, payload}) => {
  switch (type) {
    case "SET_TAB":
      return {
        ...state,
        [this.store.currentUser.login]: payload.tab
      };
    default:
      return state;
  }
}

export default currentTab;
