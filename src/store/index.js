import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import initialState from "./initialState";
import createSagaMiddleware from "redux-saga";

const configureStore = () => {
  const localState = JSON.parse(localStorage.getItem("store"));

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, localState? localState: initialState, applyMiddleware(sagaMiddleware));  

  store.subscribe(() => {
    localStorage.setItem("store", JSON.stringify(store.getState()));
  });

  return store;
}

export default configureStore;
