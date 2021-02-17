import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchRegister } from '../services/api/http/fetchRegister';
import { setToken } from '../services/api/http/configuredFetch';
import {
  ALL,
  ERROR,
  REGISTER,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_TAB,
} from '../constants';

const workerRegister = function* ({ payload }) {
  try {
    const data = yield call(fetchRegister, payload);
    yield call(setToken, data.token);

    yield put({ type: SET_CURRENT_USER, payload: { user: data } });
    yield put({ type: SET_TAB, payload: { login: data.login, tab: ALL } });
  } catch (e) {
    yield put({ type: SET_ERROR, payload: { error: e } });
    yield put({
      type: SET_NOTIFICATION,
      payload: { notification: { message: e.message, type: ERROR } },
    });
  }
};

export const watchRegister = function* () {
  yield takeEvery(REGISTER, workerRegister);
};
