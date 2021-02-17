import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import * as PropTypes from 'prop-types';

export const ModalDeleteUser = ({ open, onConfirm, onClose, login }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete user</DialogTitle>
    <DialogContent>
      <DialogContentText>{`Do you want delete user "${login}"?`}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" color="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

ModalDeleteUser.defaultProps = {
  open: false,
  onConfirm: () => null,
  onClose: () => null,
  login: '',
};

ModalDeleteUser.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  login: PropTypes.string,
};
