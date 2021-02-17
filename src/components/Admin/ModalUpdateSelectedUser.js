import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';
import { ModalUncheckedCurrentUser } from './ModalUncheckedCurrentUser';
import { updateUsers } from '../../actions';

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
  chooserContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  chooser: {
    margin: 5,
  },
});

export const ModalUpdateSelectedUsers = ({ open, setOpen, selectedUsers }) => {
  const { removeSelectedUser, removeSelectedUsers } = useContext(SelectedUsersContext);
  const [openModalUncheck, setOpenModalUncheck] = useState(false);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnClose = useCallback(() => {
    setStatus('');
    setRole('');
    setOpen(false);
  }, []);

  const handleOnConfirm = useCallback(() => {
    if (status === '' && role === '') {
      return;
    }

    dispatch(
      updateUsers(
        selectedUsers.map((user) => user.id),
        status,
        role,
      ),
    );

    removeSelectedUsers(selectedUsers);

    setStatus('');
    setRole('');
    setOpen(false);
  }, [selectedUsers, status, role]);

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
        <DialogTitle>Update users</DialogTitle>
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
          <div>
            <DialogContentText>Update value:</DialogContentText>
            <div className={classes.chooserContainer}>
              <FormControl
                classes={{
                  root: classes.chooser,
                }}
                variant="filled"
              >
                <InputLabel id="role-label" shrink>
                  Role
                </InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  displayEmpty
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <MenuItem value="">Choose role</MenuItem>
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                classes={{
                  root: classes.chooser,
                }}
                variant="filled"
              >
                <InputLabel id="status-label" shrink>
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  displayEmpty
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  <MenuItem value="">Choose status</MenuItem>
                  <MenuItem value>active</MenuItem>
                  <MenuItem value={false}>inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
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

ModalUpdateSelectedUsers.defaultProps = {
  open: false,
  setOpen: () => null,
  selectedUsers: [],
};

ModalUpdateSelectedUsers.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  selectedUsers: PropTypes.arrayOf(PropTypes.object),
};
