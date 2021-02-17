import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ButtonMoreUser } from './ButtonMoreUser';
import { ModalDeleteUser } from './ModalDeleteUser';
import { deleteUser } from '../../actions';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';

export const CellUserMore = ({ id, login, isCurrentUser }) => {
  const { removeSelectedUser } = useContext(SelectedUsersContext);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = useCallback(() => {
    setOpenModalDelete(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModalDelete(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    removeSelectedUser(id);
    dispatch(deleteUser(id));
    setOpenModalDelete(false);
  }, []);

  return (
    <div>
      <ButtonMoreUser onClickDelete={handleOpenModal} disabled={isCurrentUser} />
      <ModalDeleteUser
        open={openModalDelete}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        login={login}
      />
    </div>
  );
};

CellUserMore.defaultProps = {
  id: 0,
  login: '',
  isCurrentUser: false,
};

CellUserMore.propTypes = {
  id: PropTypes.number,
  login: PropTypes.string,
  isCurrentUser: PropTypes.bool,
};
