import React, { useCallback } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { NavLink } from 'react-router-dom';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: 400,
  },
  buttonBack: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export const NavigationDrawer = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();

  const handleOnClickButtonBack = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Drawer anchor="left" open={isOpen}>
      <div className={classes.root}>
        <IconButton className={classes.buttonBack} onClick={handleOnClickButtonBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <List>
          <ListItem button component={NavLink} to="/todos">
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText>Todos</ListItemText>
          </ListItem>
          <ListItem button component={NavLink} to="/admin">
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText>Admin</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

NavigationDrawer.defaultProps = {
  isOpen: false,
  setIsOpen: () => null,
};

NavigationDrawer.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
