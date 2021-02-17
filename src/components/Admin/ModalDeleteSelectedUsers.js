import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';
import { ModalUncheckedCurrentUser } from './ModalUncheckedCurrentUser';
import { deleteUsers } from '../../actions';

const useStyles = makeStyles({
  root: {},
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 400,
  },
  chip: {
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
});

export const ModalDeleteSelectedUsers = ({ open, setOpen, selectedUsers }) => {
  const { removeSelectedUser, removeSelectedUsers } = useContext(SelectedUsersContext);
  const [openModalUncheck, setOpenModalUncheck] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOnConfirm = useCallback(() => {
    dispatch(deleteUsers(selectedUsers.map((user) => user.id)));
    removeSelectedUsers(selectedUsers);
    setOpen(false);
  }, [selectedUsers]);

  const currentUserId = useSelector((state) => state.currentUser.id);
  const isSelectedCurrentUser = useMemo(
    () => Boolean(selectedUsers.find((user) => user.id === currentUserId)),
    [selectedUsers, currentUserId],
  );

  useEffect(() => {
    if (open && isSelectedCurrentUser) {
      setOpenModalUncheck(true);
    }
    if (!selectedUsers.length) {
      setOpen(false);
    }
  }, [selectedUsers, isSelectedCurrentUser, open]);

  const handleOnDeleteChip = useCallback(
    (id) => () => {
      removeSelectedUser(id);
    },
    [],
  );

  return (
    <>
      <Dialog open={!openModalUncheck && open} onClose={handleOnClose}>
        <DialogTitle>Delete users</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want delete users?</DialogContentText>
          <div className={classes.container}>
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                classes={{ root: classes.chip }}
                variant="outlined"
                label={user.login}
                color="primary"
                onDelete={handleOnDeleteChip(user.id)}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleOnClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleOnConfirm}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <ModalUncheckedCurrentUser
        open={openModalUncheck}
        setOpen={setOpenModalUncheck}
        setOpenParentModal={setOpen}
        currentUserId={currentUserId}
      />
    </>
  );
};

ModalDeleteSelectedUsers.defaultProps = {
  open: false,
  setOpen: () => null,
  selectedUsers: [],
};

ModalDeleteSelectedUsers.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  selectedUsers: PropTypes.arrayOf(PropTypes.object),
};
