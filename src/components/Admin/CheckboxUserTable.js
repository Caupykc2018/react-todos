import React, { useCallback, useContext, useState } from 'react';
import {
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import { SelectedUsersContext } from '../../context/selectedUsers/selectedUsersContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    width: 40,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
  popoverTextContainer: {
    padding: 10,
  },
});

export const CheckboxUserTable = ({ pageViewedUsers, pageSelectedUsers }) => {
  const classes = useStyles();
  const { selectedUsers, clearSelectedUsers, addSelectedUsers, removeSelectedUsers } = useContext(
    SelectedUsersContext,
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const users = useSelector((state) => state.users);

  const handleOnClickDropDownIcon = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleOnChangeCheckboxUser = useCallback(() => {
    if (pageSelectedUsers.length) {
      removeSelectedUsers(pageSelectedUsers);
    } else {
      addSelectedUsers(pageViewedUsers);
    }
  }, [pageSelectedUsers, pageViewedUsers]);

  const handleOnClosePopover = useCallback(() => setAnchorEl(null), []);

  const handleOnChangeCheckboxTable = useCallback(() => {
    if (selectedUsers.length) {
      clearSelectedUsers();
    } else {
      addSelectedUsers(users);
    }
  }, [selectedUsers]);

  return (
    <div className={classes.root}>
      <Checkbox
        style={{ width: 10, height: 10 }}
        indeterminate={
          pageSelectedUsers.length !== pageViewedUsers.length && Boolean(pageSelectedUsers.length)
        }
        checked={pageSelectedUsers.length === pageViewedUsers.length}
        onChange={handleOnChangeCheckboxUser}
      />
      <IconButton style={{ width: 10, height: 10 }} onClick={handleOnClickDropDownIcon}>
        <ArrowDropDownIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleOnClosePopover}
        open={Boolean(anchorEl)}
      >
        <div className={classes.popoverTextContainer}>
          <Typography>{`Selected users: ${selectedUsers.length}`}</Typography>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleOnChangeCheckboxTable}>
            <ListItemIcon>
              <Checkbox
                indeterminate={
                  selectedUsers.length !== users.length && Boolean(selectedUsers.length)
                }
                checked={selectedUsers.length === users.length}
              />
            </ListItemIcon>
            <ListItemText>Select all</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

CheckboxUserTable.defaultProps = {
  pageViewedUsers: [],
  pageSelectedUsers: [],
};

CheckboxUserTable.propTypes = {
  pageViewedUsers: PropTypes.arrayOf(PropTypes.object),
  pageSelectedUsers: PropTypes.arrayOf(PropTypes.object),
};
