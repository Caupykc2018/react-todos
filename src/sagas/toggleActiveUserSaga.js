import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchToggleActiveUser } from '../services/api/http/fetchToggleActiveUser';
import {
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_USER,
  TOGGLE_ACTIVE_USER,
} from '../constants';

const workerToggleActiveUser = function* ({ payload }) {
  try {
    const data = yield call(fetchToggleActiveUser, payload);

    yield put({ type: SET_USER, payload: { user: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: TOGGLE_ACTIVE_USER, refetchPayload: payload },
      });
    } else if (e.status === 403) {
      yield put({ type: SET_ERROR, payload: { error: e } });
    } else {
      yield put({ type: SET_ERROR, payload: { error: e } });
      yield put({
        type: SET_NOTIFICATION,
        payload: { notification: { message: e.message, type: ERROR } },
      });
    }
  }
};

export const watchToggleActiveUser = function* () {
  yield takeEvery(TOGGLE_ACTIVE_USER, workerToggleActiveUser);
};
