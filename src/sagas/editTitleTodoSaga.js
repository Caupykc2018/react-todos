import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEditTitleTodo } from '../services/api/http/fetchEditTitleTodo';
import {
  EDIT_TITLE_TODO,
  ERROR,
  REFRESH_TOKEN,
  SET_ERROR,
  SET_NOTIFICATION,
  SET_TODO,
} from '../constants';

const workerEditTitleTodo = function* ({ payload }) {
  try {
    const data = yield call(fetchEditTitleTodo, payload);

    yield put({ type: SET_TODO, payload: { todo: data } });
  } catch (e) {
    if (e.status === 401) {
      yield put({
        type: REFRESH_TOKEN,
        payload: { refetchType: EDIT_TITLE_TODO, refetchPayload: payload },
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

export const watchEditTitleTodo = function* () {
  yield takeEvery(EDIT_TITLE_TODO, workerEditTitleTodo);
};
