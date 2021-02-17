import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { NavBar } from '../components/NavBar';
import { getAllUsers, refreshToken } from '../actions';
import { TitleContext } from '../context/title/titleContext';
import { TableUsers } from '../components/Admin/TableUsers';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
  },
});

export const AdminPage = () => {
  const classes = useStyles();
  const { setTitle } = useContext(TitleContext);
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState(false);

  const isAdmin = useSelector((state) => state.currentUser.role === 'admin');

  useEffect(() => {
    setTitle('Admin');
  }, []);

  useEffect(() => {
    dispatch(refreshToken());

    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isAdmin) {
      setIsRedirect(true);
    }
  }, [isAdmin]);

  if (isRedirect) {
    return <Redirect to="/todos" />;
  }

  return (
    <>
      <NavBar />
      <div className={classes.app}>
        <TableUsers />
      </div>
    </>
  );
};
