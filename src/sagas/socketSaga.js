import { eventChannel } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import { ADD_TODO, SOCKET_CHANGES } from '../constants';
import { configuredSocket } from '../services/api/socket/configuredSoket';

const socketChannel = function (socket) {
  return eventChannel((emit) => {
    socket.on(SOCKET_CHANGES, (payload) => {
      emit(payload);
    });

    const unsubscribe = () => {
      socket.removeAllListeners(SOCKET_CHANGES);
    };

    return unsubscribe;
  });
};

export const watchSocket = function* () {
  const channel = yield call(socketChannel, configuredSocket);

  while (true) {
    const payload = yield take(channel);
    if (payload) {
      const role = yield select((state) => state.currentUser.role);

      if (payload.role === role || payload.role === undefined) {
        if (payload.type === ADD_TODO) {
          const { todo } = payload.action.payload;
          const { disableStart, disableEnd, start, end, search } = yield select(
            (state) => state.filters,
          );
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
              yield put(payload);
            }
          } else if (compareStart && compareEnd) {
            yield put(payload);
          }
        } else {
          yield put(payload);
        }
      }
    }
  }
};
