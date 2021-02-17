import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { HeaderCellMore } from './HeaderCellMore';
import { UserRow } from './UserRow';
import { CheckboxUserTable } from './CheckboxUserTable';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';

export const TableUsers = () => {
  const { selectedUsers } = useContext(SelectedUsersContext);
  const users = useSelector((state) => state.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const pageViewedUsers = useMemo(() => users.slice(rowsPerPage * page, rowsPerPage * (page + 1)), [
    users,
    rowsPerPage,
    page,
  ]);

  const pageSelectedUsers = useMemo(() => {
    let resultSelectedUsers = [];
    pageViewedUsers.forEach((user) => {
      const findUser = selectedUsers.find((userEl) => user.id === userEl.id);
      if (findUser) {
        resultSelectedUsers = [...resultSelectedUsers, findUser];
      }
    });

    return resultSelectedUsers;
  }, [pageViewedUsers, selectedUsers]);

  const handleOnChangePage = useCallback((_, changedPage) => {
    setPage(changedPage);
  }, []);

  const handleOnChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" align="center">
              <CheckboxUserTable
                pageViewedUsers={pageViewedUsers}
                pageSelectedUsers={pageSelectedUsers}
              />
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                Login
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                Role
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
                <HeaderCellMore pageSelectedUsers={pageSelectedUsers} />
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pageViewedUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={users.length}
              rowsPerPageOptions={[1, 5, 10, 25, { label: 'ALL', value: users.length }]}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleOnChangePage}
              onChangeRowsPerPage={handleOnChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
