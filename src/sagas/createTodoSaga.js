import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchCreateTodo } from '../services/api/http/fetchCreateTodo';
import {
  ADD_TODO,
  CREATE_TODO,
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
} from '../constants';

const workerCreateTodo = function* ({ payload }) {
  try {
    const data = yield call(fetchCreateTodo, payload);

    const todo = data;
    const { disableStart, disableEnd, start, end, search } = yield select((state) => state.filters);
    const startDate = disableStart || start === '' ? null : new Date(start);
    const endDate = disableEnd || end === '' ? null : new Date(end);
    let compareStart = false;
    let compareEnd = false;

    if (startDate) {
      if (startDate <= todo.createdAt) {
        compareStart = true;
      }
    } else {
      compareStart = true;
    }

    if (endDate) {
      if (endDate >= todo.createdAt) {
        compareEnd = true;
      }
    } else {
      compareEnd = true;
    }

    if (search) {
      if (todo.title.includes(search)) {
        yield put({ type: ADD_TODO, payload: { todo: data } });
      }
    } else if (compareStart && compareEnd) {
      yield put({ type: ADD_TODO, payload: { todo: data } });
    }
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: CREATE_TODO, refetchPayload: payload },
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

export const watchCreateTodo = function* () {
  yield takeEvery(CREATE_TODO, workerCreateTodo);
};
