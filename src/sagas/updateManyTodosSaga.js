import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_TODOS,
  UPDATE_TODOS,
} from '../constants';
import { fetchUpdateManyTodos } from '../services/api/http/fetchUpdateManyTodos';

const workerUpdateManyTodos = function* ({ payload }) {
  try {
    const data = yield call(fetchUpdateManyTodos, payload);

    yield put({ type: SET_TODOS, payload: { todos: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: UPDATE_TODOS, refetchPayload: payload },
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

export const watchUpdateManyTodos = function* () {
  yield takeEvery(UPDATE_TODOS, workerUpdateManyTodos);
};
