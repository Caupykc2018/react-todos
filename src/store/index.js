import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootReducer from '../reducers';
import initialState from './initialState';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(logger), applyMiddleware(sagaMiddleware)),
  );

  store.subscribe(() => {
    const { currentTab, currentUser } = store.getState();

    const savedLocalState = {
      currentTab,
      currentUser: {
        token: currentUser.token,
        refreshToken: currentUser.refreshToken,
      },
    };

    localStorage.setItem('store', JSON.stringify(savedLocalState));
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
