import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchLogin } from '../services/api/http/fetchLogin';
import { setToken } from '../services/api/http/configuredFetch';
import {
  ALL,
  ERROR,
  LOGIN,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_TAB,
} from '../constants';

const workerLogin = function* ({ payload }) {
  try {
    const data = yield call(fetchLogin, payload);
    yield call(setToken, data.token);

    yield put({ type: SET_CURRENT_USER, payload: { user: data } });

    const isEmptyCurrentTab = yield select((state) => !state.currentTab[data.login]);

    if (isEmptyCurrentTab) {
      yield put({ type: SET_TAB, payload: { login: data.login, tab: ALL } });
    }
  } catch (e) {
    yield put({ type: SET_ERROR, payload: { error: e } });
    yield put({
      type: SET_NOTIFICATION,
      payload: { notification: { message: e.message, type: ERROR } },
    });
  }
};

export const watchLogin = function* () {
  yield takeEvery(LOGIN, workerLogin);
};
