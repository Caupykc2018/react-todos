import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchGetAllTodos } from '../services/api/http/fetchGetAllTodos';
import {
  ERROR,
  GET_ALL_TODOS,
  INITIAL_TODOS,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerGetAllTodos = function* () {
  try {
    const { disableStart, disableEnd, start, end, search } = yield select((state) => state.filters);

    const startDate = disableStart || start === '' ? null : start;
    const endDate = disableEnd || end === '' ? null : end;

    const data = yield call(fetchGetAllTodos, { startDate, endDate, search });

    yield put({ type: INITIAL_TODOS, payload: { todos: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: GET_ALL_TODOS, refetchPayload: {} },
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

export const watchGetAllTodos = function* () {
  yield takeEvery(GET_ALL_TODOS, workerGetAllTodos);
};
