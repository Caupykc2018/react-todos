import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchGetAllUsers } from '../services/api/http/fetchGetAllUsers';
import {
  ERROR,
  GET_ALL_USERS,
  INITIAL_USERS,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerGetAllUsers = function* () {
  try {
    const data = yield call(fetchGetAllUsers);

    yield put({ type: INITIAL_USERS, payload: { users: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: GET_ALL_USERS, refetchPayload: {} },
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

export const watchGetAllUsers = function* () {
  yield takeEvery(GET_ALL_USERS, workerGetAllUsers);
};
