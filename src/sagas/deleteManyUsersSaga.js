import { call, put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_USERS,
  ERROR,
  REFRESH_TOKEN,
  REMOVE_USERS,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';
import { fetchDeleteManyUsers } from '../services/api/http/fetchDeleteManyUsers';

const workerDeleteManyUsers = function* ({ payload }) {
  try {
    const data = yield call(fetchDeleteManyUsers, payload);

    yield put({ type: REMOVE_USERS, payload: { users: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: REMOVE_USERS, refetchPayload: payload },
      });
    } else {
      yield put({ type: SET_ERROR, payload: { error: e } });
      yield put({
        type: SET_NOTIFICATION,
        payload: { notification: { message: e.message, type: ERROR } },
      });
    }
  }
};

export const watchDeleteManyUsers = function* () {
  yield takeEvery(DELETE_USERS, workerDeleteManyUsers);
};
