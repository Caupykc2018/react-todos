export const initialTab = (idUser) => ({
  type: "INITIAL_TAB",
  payload: {idUser}
})

export const setTab = (idUser, tab) => ({
  type: "SET_TAB",
  payload: {idUser, tab}
})

export const setUserTab = (tab) => {
  return (dispatch, getState) => {
    const { currentUser } = getState();

    dispatch(setTab(currentUser.id, tab));
  }
}
