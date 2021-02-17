import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchDeleteUser } from '../services/api/http/fetchDeleteUser';
import {
  DELETE_USER,
  ERROR,
  REFRESH_TOKEN,
  REMOVE_USER,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerDeleteUser = function* ({ payload }) {
  try {
    const data = yield call(fetchDeleteUser, payload);

    yield put({ type: REMOVE_USER, payload: { user: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: DELETE_USER, refetchPayload: payload },
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

export const watchDeleteUser = function* () {
  yield takeEvery(DELETE_USER, workerDeleteUser);
};
