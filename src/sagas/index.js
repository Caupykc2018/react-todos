import { all } from 'redux-saga/effects';
import { watchLogin } from './loginSaga';
import { watchRegister } from './registerSaga';
import { watchLogOut } from './logOutSaga';
import { watchRefreshToken } from './refreshTokenSaga';
import { watchGetAllTodos } from './getAllTodosSaga';
import { watchCreateTodo } from './createTodoSaga';
import { watchDeleteTodo } from './deleteTodoSaga';
import { watchToggleStatusTodo } from './toggleStatusTodoSaga';
import { watchEditTitleTodo } from './editTitleTodoSaga';
import { watchToggleStatusAllTodos } from './toggleStatusAllTodosSaga';
import { watchSetUserTab } from './setUserTabSaga';
import { watchClearCompletedTodos } from './clearCompletedTodosSaga';
import { watchGetAllUsers } from './getAllUsersSaga';
import { watchEditRoleUser } from './editRoleUserSaga';
import { watchToggleActiveUser } from './toggleActiveUserSaga';
import { watchDeleteUser } from './deleteUserSaga';
import { watchSocket } from './socketSaga';
import { watchDeleteManyUsers } from './deleteManyUsersSaga';
import { watchUpdateManyUsers } from './updateManyUsersSaga';
import { watchUpdateManyTodos } from './updateManyTodosSaga';
import { watchDeleteManyTodos } from './deleteManyTodosSaga';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchLogOut(),
    watchRefreshToken(),
    watchGetAllTodos(),
    watchCreateTodo(),
    watchDeleteTodo(),
    watchToggleStatusTodo(),
    watchEditTitleTodo(),
    watchToggleStatusAllTodos(),
    watchSetUserTab(),
    watchClearCompletedTodos(),
    watchGetAllUsers(),
    watchEditRoleUser(),
    watchToggleActiveUser(),
    watchDeleteUser(),
    watchSocket(),
    watchDeleteManyUsers(),
    watchUpdateManyUsers(),
    watchUpdateManyTodos(),
    watchDeleteManyTodos(),
  ]);
}
