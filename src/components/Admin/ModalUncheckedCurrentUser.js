import React, { useCallback, useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';

export const ModalUncheckedCurrentUser = ({ open, setOpen, setOpenParentModal, currentUserId }) => {
  const { removeSelectedUser } = useContext(SelectedUsersContext);

  const handleOnConfirm = useCallback(() => {
    removeSelectedUser(currentUserId);
    setOpen(false);
  }, [currentUserId]);

  const handleOnCancel = useCallback(() => {
    setOpen(false);
    setOpenParentModal(false);
  }, []);

  return (
    <Dialog open={open} onClose={handleOnCancel}>
      <DialogTitle>You checked your account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You cannot perform this action on your account. Do you want unchecked your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleOnCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleOnConfirm}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalUncheckedCurrentUser.defaultProps = {
  open: false,
  setOpen: () => null,
  setOpenParentModal: () => null,
  currentUserId: 0,
};

ModalUncheckedCurrentUser.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setOpenParentModal: PropTypes.func,
  currentUserId: PropTypes.number,
};
