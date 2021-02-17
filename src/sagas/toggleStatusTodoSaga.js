import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchToggleStatusTodo } from '../services/api/http/fetchToggleStatusTodo';
import {
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_TODO,
  TOGGLE_STATUS_TODO,
} from '../constants';

const workerToggleStatusTodo = function* ({ payload }) {
  try {
    const data = yield call(fetchToggleStatusTodo, payload);

    yield put({ type: SET_TODO, payload: { todo: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: TOGGLE_STATUS_TODO, refetchPayload: payload },
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

export const watchToggleStatusTodo = function* () {
  yield takeEvery(TOGGLE_STATUS_TODO, workerToggleStatusTodo);
};
