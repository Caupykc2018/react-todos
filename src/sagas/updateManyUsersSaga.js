import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_USERS,
  UPDATE_USERS,
} from '../constants';
import { fetchUpdateManyUsers } from '../services/api/http/fetchUpdateManyUsers';

const workerUpdateManyUsers = function* ({ payload }) {
  try {
    const data = yield call(fetchUpdateManyUsers, payload);

    yield put({ type: SET_USERS, payload: { users: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: UPDATE_USERS, refetchPayload: payload },
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

export const watchUpdateManyUsers = function* () {
  yield takeEvery(UPDATE_USERS, workerUpdateManyUsers);
};
