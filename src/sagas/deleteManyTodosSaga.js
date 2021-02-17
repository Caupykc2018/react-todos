import { call, put, takeEvery } from 'redux-saga/effects';
import {
  DELETE_TODOS,
  ERROR,
  REFRESH_TOKEN,
  REMOVE_TODOS,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';
import { fetchDeleteManyTodos } from '../services/api/http/fetchDeleteManyTodos';

const workerDeleteManyTodos = function* ({ payload }) {
  try {
    const data = yield call(fetchDeleteManyTodos, payload);

    yield put({ type: REMOVE_TODOS, payload: { todos: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: DELETE_TODOS, refetchPayload: payload },
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

export const watchDeleteManyTodos = function* () {
  yield takeEvery(DELETE_TODOS, workerDeleteManyTodos);
};
