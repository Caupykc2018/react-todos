import { setToken } from '../services/api/http/configuredFetch';

const localState = JSON.parse(localStorage.getItem('store')) || {};

const initialState = {
  todos: [],
  users: [],
  currentUser: localState.currentUser || {},
  currentTab: localState.currentTab || {},
  error: {},
  notification: {},
  filters: {
    start: '',
    disableStart: false,
    end: '',
    disableEnd: false,
    search: ''
  },
};

if (initialState.currentUser.token) {
  setToken(initialState.currentUser.token);
}

export default initialState;
