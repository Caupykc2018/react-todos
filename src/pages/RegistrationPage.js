import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { FormAddUser } from '../components/Registration/FormAddUser';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    width: 400,
    border: '1px solid lightgray',
  },
  textButtonLogin: {
    fontSize: 10,
  },
  title: {
    marginBottom: 10,
  },
});

export const RegistrationPage = () => {
  const isAuth = useSelector((state) => !!state.currentUser.login);

  const classes = useStyles();

  if (isAuth) {
    return <Redirect to="/todos" />;
  }

  return (
    <>
      <Paper className={classes.app}>
        <Typography variant="h3" className={classes.title}>
          Registration
        </Typography>
        <FormAddUser />
        <Button
          classes={{
            text: classes.textButtonLogin,
          }}
          component={Link}
          to="/login"
        >
          Login
        </Button>
      </Paper>
    </>
  );
};
