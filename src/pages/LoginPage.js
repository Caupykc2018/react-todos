import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { FormLogin } from '../components/Login/FormLogin';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    width: 300,
    border: '1px solid lightgray',
  },
  textButtonRegister: {
    fontSize: 10,
  },
  title: {
    marginBottom: 10,
  },
});

export const LoginPage = () => {
  const isAuth = useSelector((state) => !!state.currentUser.refreshToken);

  const classes = useStyles();

  if (isAuth) {
    return <Redirect to="/todos" />;
  }

  return (
    <>
      <Paper className={classes.app}>
        <Typography variant="h3" className={classes.title}>
          Login
        </Typography>
        <FormLogin />
        <Button
          classes={{
            text: classes.textButtonRegister,
          }}
          component={Link}
          to="/register"
        >
          Create account
        </Button>
      </Paper>
    </>
  );
};
