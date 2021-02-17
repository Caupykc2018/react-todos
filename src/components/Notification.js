import React, { useEffect, useCallback } from 'react';

import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { ERROR, INFO, WARNING } from '../constants';
import { clearNotification } from '../actions';

const useStyles = makeStyles({
  body: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    bottom: -60,
    transition: 'bottom .5s',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    boxShadow: '0 -2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  visible: {
    bottom: 0,
  },
  message: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 20,
  },
  buttonCancel: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    height: '100%',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 0,
  },
});

export const Notification = () => {
  const classes = useStyles();

  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const handleOnClickButtonCancel = useCallback(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  useEffect(() => {
    if (notification.message) {
      const idTimeout = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => clearTimeout(idTimeout);
    }
    return () => null;
  }, [dispatch, notification]);

  const color = () => {
    switch (notification.type) {
      case INFO:
        return 'lightblue';
      case WARNING:
        return 'yellow';
      case ERROR:
        return 'red';
      default:
        return 'lightblue';
    }
  };

  return (
    <div
      style={{ backgroundColor: color() }}
      className={[classes.body, notification.message && classes.visible].join(' ')}
    >
      <div>
        <p className={classes.message}>{notification.message}</p>
      </div>
      <div>
        <button type="button" onClick={handleOnClickButtonCancel} className={classes.buttonCancel}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};
