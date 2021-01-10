import {combineReducers} from "redux";
import todos from "./todos";
import users from "./users";
import currentUser from "./currentUser";
import currentTab from "./currentTab";

export default combineReducers({
  todos: todos,
  users: users,
  currentUser: currentUser,
  currentTab: currentTab
});
