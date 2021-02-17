import React, { useCallback, useContext, useMemo } from 'react';
import { Checkbox, MenuItem, Select, TableCell, TableRow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { CellUserMore } from './CellUserMore';
import { editRoleUser, toggleActiveUser } from '../../actions';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';

export const UserRow = ({ user }) => {
  const { selectedUsers, addSelectedUser, removeSelectedUser } = useContext(SelectedUsersContext);

  const isCurrentUser = useSelector((state) => state.currentUser.id === user.id);

  const checkedSelect = useMemo(() => Boolean(selectedUsers.find(({ id }) => user.id === id)), [
    selectedUsers,
  ]);

  const dispatch = useDispatch();

  const handleOnChangeCheckBox = useCallback(() => {
    if (!checkedSelect) {
      addSelectedUser(user);
    } else {
      removeSelectedUser(user.id);
    }
  }, [checkedSelect]);

  const handleOnChangeStatus = useCallback((event) => {
    dispatch(toggleActiveUser(user.id, event.target.value));
  }, []);

  const handleOnChangeRole = useCallback((event) => {
    dispatch(editRoleUser(user.id, event.target.value));
  }, []);

  return (
    <TableRow>
      <TableCell align="center">
        <Checkbox onChange={handleOnChangeCheckBox} checked={checkedSelect} />
      </TableCell>
      <TableCell align="center">{user.id}</TableCell>
      <TableCell align="center">{user.login}</TableCell>
      <TableCell align="center">
        <Select value={user.isActive} onChange={handleOnChangeStatus} disabled={isCurrentUser}>
          <MenuItem value>active</MenuItem>
          <MenuItem value={false}>inactive</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="center">
        <Select value={user.role} onChange={handleOnChangeRole} disabled={isCurrentUser}>
          <MenuItem value="user">user</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="right">
        <CellUserMore id={user.id} login={user.login} isCurrentUser={isCurrentUser} />
      </TableCell>
    </TableRow>
  );
};

UserRow.defaultProps = {
  user: {
    id: 0,
    login: '',
    isActive: false,
    role: 'user',
  },
};

UserRow.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.number,
    login: PropTypes.string,
    isActive: PropTypes.bool,
    role: PropTypes.string,
  }),
};
