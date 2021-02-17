import React, { useCallback, useContext, useState } from 'react';
import * as PropTypes from 'prop-types';
import { ModalDeleteSelectedUsers } from './ModalDeleteSelectedUsers';
import { ButtonMoreTable } from './ButtonMoreTable';
import { ModalUpdateSelectedUsers } from './ModalUpdateSelectedUser';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';

export const HeaderCellMore = ({ pageSelectedUsers }) => {
  const { selectedUsers } = useContext(SelectedUsersContext);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [currentSelectedUsers, setCurrentSelectedUsers] = useState([]);

  const handleOpenModalDeletePage = useCallback(() => {
    setCurrentSelectedUsers(pageSelectedUsers);
    setOpenModalDelete(true);
  }, [pageSelectedUsers]);

  const handleOpenModalUpdatePage = useCallback(() => {
    setCurrentSelectedUsers(pageSelectedUsers);
    setOpenModalUpdate(true);
  }, [pageSelectedUsers]);

  const handleOpenModalDeleteAll = useCallback(() => {
    setCurrentSelectedUsers(selectedUsers);
    setOpenModalDelete(true);
  }, [selectedUsers]);

  const handleOpenModalUpdateAll = useCallback(() => {
    setCurrentSelectedUsers(selectedUsers);
    setOpenModalUpdate(true);
  }, [selectedUsers]);

  return (
    <div>
      <ButtonMoreTable
        onClickDeletePage={handleOpenModalDeletePage}
        onClickUpdatePage={handleOpenModalUpdatePage}
        onClickDeleteAll={handleOpenModalDeleteAll}
        onClickUpdateAll={handleOpenModalUpdateAll}
        isEmptySelectedAllUsers={Boolean(selectedUsers.length)}
        isEmptySelectedPageUsers={Boolean(pageSelectedUsers.length)}
      />
      <ModalDeleteSelectedUsers
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        selectedUsers={currentSelectedUsers}
      />
      <ModalUpdateSelectedUsers
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
        selectedUsers={currentSelectedUsers}
      />
    </div>
  );
};

HeaderCellMore.defaultProps = {
  pageSelectedUsers: [],
};

HeaderCellMore.propTypes = {
  pageSelectedUsers: PropTypes.arrayOf(PropTypes.object),
};
