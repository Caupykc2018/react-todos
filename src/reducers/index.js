import { combineReducers } from 'redux';
import todos from './todos';
import users from './users';
import currentUser from './currentUser';
import currentTab from './currentTab';
import error from './error';
import notification from './notification';
import filters from './filters';

export default combineReducers({
  todos,
  users,
  currentUser,
  currentTab,
  error,
  notification,
  filters,
});
