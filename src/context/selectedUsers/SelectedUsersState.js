import React, { useReducer } from 'react';
import * as PropTypes from 'prop-types';
import { SelectedUsersContext } from './selectedUsersContext';
import { selectedUsersReducer } from './selectedUsersReducer';
import {
  ADD_SELECTED_USER,
  ADD_SELECTED_USERS,
  CLEAR_SELECTED_USERS,
  REMOVE_SELECTED_USER,
  REMOVE_SELECTED_USERS,
} from '../../constants';

export const SelectedUsersState = ({ children }) => {
  const [state, dispatch] = useReducer(selectedUsersReducer, []);

  const addSelectedUsers = (users) => dispatch({ type: ADD_SELECTED_USERS, payload: { users } });
  const addSelectedUser = (user) => dispatch({ type: ADD_SELECTED_USER, payload: { user } });
  const removeSelectedUsers = (users) =>
    dispatch({ type: REMOVE_SELECTED_USERS, payload: { users } });
  const removeSelectedUser = (id) =>
    dispatch({ type: REMOVE_SELECTED_USER, payload: { user: { id } } });
  const clearSelectedUsers = () => dispatch({ type: CLEAR_SELECTED_USERS });

  return (
    <SelectedUsersContext.Provider
      value={{
        selectedUsers: state,
        addSelectedUsers,
        addSelectedUser,
        removeSelectedUsers,
        removeSelectedUser,
        clearSelectedUsers,
      }}
    >
      {children}
    </SelectedUsersContext.Provider>
  );
};

SelectedUsersState.defaultProps = {
  children: null,
};

SelectedUsersState.propTypes = {
  children: PropTypes.element,
};
