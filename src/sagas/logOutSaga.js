import { takeEvery, put } from 'redux-saga/effects';
import { CLEAR_CURRENT_USER, CLEAR_TODOS, CLEAR_USERS } from '../constants';

const workerLogOut = function* () {
  yield put({ type: CLEAR_TODOS });
  yield put({ type: CLEAR_USERS });
  yield put({ type: CLEAR_CURRENT_USER });
};

export const watchLogOut = function* () {
  yield takeEvery('LOG_OUT', workerLogOut);
};
