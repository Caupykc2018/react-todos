import React, { useCallback, useState } from 'react';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Popover } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import * as PropTypes from 'prop-types';

export const ButtonMoreUser = ({ onClickDelete, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOnClickButton = useCallback((event) => setAnchorEl(event.currentTarget), []);

  const handleOnClosePopover = useCallback(() => setAnchorEl(null), []);

  return (
    <div>
      <IconButton onClick={handleOnClickButton}>
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
        onClose={handleOnClosePopover}
        open={Boolean(anchorEl)}
      >
        <List>
          <ListItem button onClick={onClickDelete} disabled={disabled}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

ButtonMoreUser.defaultProps = {
  onClickDelete: () => null,
  disabled: false,
};

ButtonMoreUser.propTypes = {
  onClickDelete: PropTypes.func,
  disabled: PropTypes.bool,
};
