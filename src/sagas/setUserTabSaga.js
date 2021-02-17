import { put, select, takeEvery } from 'redux-saga/effects';
import { SET_TAB, SET_USER_TAB } from '../constants';

const workerSetUserTab = function* ({ payload }) {
  const login = yield select((state) => state.currentUser.login);

  yield put({ type: SET_TAB, payload: { login, tab: payload.tab } });
};

export const watchSetUserTab = function* () {
  yield takeEvery(SET_USER_TAB, workerSetUserTab);
};
