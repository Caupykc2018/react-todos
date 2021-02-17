import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEditRoleUser } from '../services/api/http/fetchEditRoleUser';
import {
  EDIT_ROLE_USER,
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_USER,
} from '../constants';

const workerEditRoleUser = function* ({ payload }) {
  try {
    const data = yield call(fetchEditRoleUser, payload);

    yield put({ type: SET_USER, payload: { user: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: EDIT_ROLE_USER, refetchPayload: payload },
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

export const watchEditRoleUser = function* () {
  yield takeEvery(EDIT_ROLE_USER, workerEditRoleUser);
};
