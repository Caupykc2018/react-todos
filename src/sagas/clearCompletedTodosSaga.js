import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchClearCompletedTodos } from '../services/api/http/fetchClearCompletedTodos';
import {
  CLEAR_COMPLETED_TODOS,
  ERROR,
  REFRESH_TOKEN,
  REMOVE_TODOS,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerClearCompletedTodos = function* () {
  try {
    const data = yield call(fetchClearCompletedTodos);

    yield put({ type: REMOVE_TODOS, payload: { todos: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: CLEAR_COMPLETED_TODOS, refetchPayload: {} },
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

export const watchClearCompletedTodos = function* () {
  yield takeEvery(CLEAR_COMPLETED_TODOS, workerClearCompletedTodos);
};
