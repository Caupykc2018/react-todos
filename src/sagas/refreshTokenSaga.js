import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchRefreshToken } from '../services/api/http/fetchRefreshToken';
import { setToken } from '../services/api/http/configuredFetch';
import {
  ERROR,
  LOG_OUT,
  REFRESH_TOKEN,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerRefreshToken = function* ({ payload }) {
  try {
    const refreshToken = yield select((state) => state.currentUser.refreshToken);
    const data = yield call(fetchRefreshToken, { refreshToken });

    yield call(setToken, data.token);

    yield put({ type: SET_CURRENT_USER, payload: { user: data } });
    if (payload) {
      yield put({ type: payload.refetchType, payload: payload.refetchPayload });
    }
  } catch (e) {
    if (e.status === 401) {
      yield put({ type: LOG_OUT });
    } else {
      yield put({ type: SET_ERROR, payload: { error: e } });
      yield put({
        type: SET_NOTIFICATION,
        payload: { notification: { message: e.message, type: ERROR } },
      });
    }
  }
};

export const watchRefreshToken = function* () {
  yield takeEvery(REFRESH_TOKEN, workerRefreshToken);
};
