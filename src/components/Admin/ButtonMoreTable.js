import React, { useState } from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles({
  iconContainer: {
    width: 40,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
});

export const ButtonMoreTable = ({
  onClickDeletePage,
  onClickUpdatePage,
  onClickDeleteAll,
  onClickUpdateAll,
  isEmptySelectedAllUsers,
  isEmptySelectedPageUsers,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MoreVertIcon />
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
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
      >
        <List>
          <ListItem button onClick={onClickDeletePage} disabled={!isEmptySelectedPageUsers}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete selected on page</ListItemText>
          </ListItem>
          <ListItem button onClick={onClickUpdatePage} disabled={!isEmptySelectedPageUsers}>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText>Update selected on page</ListItemText>
          </ListItem>
          <ListItem button onClick={onClickDeleteAll} disabled={!isEmptySelectedAllUsers}>
            <ListItemIcon>
              <div className={classes.iconContainer}>
                <DeleteIcon />
              </div>
            </ListItemIcon>
            <ListItemText>Delete all selected</ListItemText>
          </ListItem>
          <ListItem button onClick={onClickUpdateAll} disabled={!isEmptySelectedAllUsers}>
            <ListItemIcon>
              <div className={classes.iconContainer}>
                <UpdateIcon />
              </div>
            </ListItemIcon>
            <ListItemText>Update all selected</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

ButtonMoreTable.defaultProps = {
  onClickDeletePage: () => null,
  onClickUpdatePage: () => null,
  onClickDeleteAll: () => null,
  onClickUpdateAll: () => null,
  isEmptySelectedAllUsers: false,
  isEmptySelectedPageUsers: false,
};

ButtonMoreTable.propTypes = {
  onClickDeletePage: PropTypes.func,
  onClickUpdatePage: PropTypes.func,
  onClickDeleteAll: PropTypes.func,
  onClickUpdateAll: PropTypes.func,
  isEmptySelectedAllUsers: PropTypes.bool,
  isEmptySelectedPageUsers: PropTypes.bool,
};
