import React, { useCallback, useContext, useState } from 'react';
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  makeStyles,
  Popover,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions';
import { TitleContext } from '../context/title/titleContext';
import { NavigationDrawer } from './NavigationDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  popoverProfile: {
    width: 200,
    padding: 10,
  },
  textLogin: {
    display: 'flex',
    flexDirection: 'row',
  },
  login: {
    fontWeight: 'bold',
    marginLeft: 2,
  },
  buttonLogOut: {
    width: '100%',
  },
}));

export const NavBar = () => {
  const { title } = useContext(TitleContext);

  const login = useSelector((state) => state.currentUser.login);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnClickNotifications = useCallback((event) => {
    setAnchorElNotifications(event.currentTarget);
  }, []);

  const handleCloseNotifications = useCallback(() => {
    setAnchorElNotifications(null);
  }, []);

  const handleOnClickProfile = useCallback((event) => {
    setAnchorElProfile(event.currentTarget);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setAnchorElProfile(null);
  }, []);

  const handleOnClickMenuButton = useCallback(() => {
    setIsOpenDrawer(true);
  }, []);

  const handleOnClickLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleOnClickMenuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <div>
            <IconButton color="inherit" onClick={handleOnClickNotifications}>
              <NotificationsIcon />
            </IconButton>
            <Popover
              anchorEl={anchorElNotifications}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotifications)}
              onClose={handleCloseNotifications}
            >
              The content of the Popover.
              {login}
            </Popover>
          </div>
          <div>
            <IconButton color="inherit" onClick={handleOnClickProfile}>
              <AccountCircle />
            </IconButton>
            <Popover
              anchorEl={anchorElProfile}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElProfile)}
              onClose={handleCloseProfile}
            >
              <div className={classes.popoverProfile}>
                <div className={classes.textLogin}>
                  <Typography>Hello,</Typography>
                  <Typography classes={{ root: classes.login }}>{login}</Typography>
                </div>
                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                <Button
                  classes={{ root: classes.buttonLogOut }}
                  variant="contained"
                  color="secondary"
                  onClick={handleOnClickLogOut}
                >
                  Log out
                </Button>
              </div>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
    </>
  );
};
