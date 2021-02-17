import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchToggleStatusAllTodos } from '../services/api/http/fetchToggleStatusAllTodos';
import {
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_TODOS,
  TOGGLE_STATUS_ALL_TODOS,
} from '../constants';

const workerToggleStatusAllTodos = function* () {
  try {
    const data = yield call(fetchToggleStatusAllTodos);

    yield put({ type: SET_TODOS, payload: { todos: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: TOGGLE_STATUS_ALL_TODOS, refetchPayload: {} },
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

export const watchToggleStatusAllTodos = function* () {
  yield takeEvery(TOGGLE_STATUS_ALL_TODOS, workerToggleStatusAllTodos);
};
