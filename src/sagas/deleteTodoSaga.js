import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchDeleteTodo } from '../services/api/http/fetchDeleteTodo';
import {
  DELETE_TODO,
  ERROR,
  REFRESH_TOKEN,
  REMOVE_TODO,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerDeleteTodo = function* ({ payload }) {
  try {
    const data = yield call(fetchDeleteTodo, payload);

    yield put({ type: REMOVE_TODO, payload: { todo: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: DELETE_TODO, refetchPayload: payload },
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

export const watchDeleteTodo = function* () {
  yield takeEvery(DELETE_TODO, workerDeleteTodo);
};
