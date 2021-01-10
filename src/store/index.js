import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import initialState from "./initialState";
import thunk from "redux-thunk";

const configureStore = () => {
  const localState = JSON.parse(localStorage.getItem("store"));

  const store = createStore(rootReducer, localState? localState: initialState, applyMiddleware(thunk))

  store.subscribe(() => {
    localStorage.setItem("store", JSON.stringify(store.getState()));
  });

  return store;
}

export default configureStore;
