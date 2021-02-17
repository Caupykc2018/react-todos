import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../actions';

const useStyles = makeStyles({
  input: {
    marginBottom: 10,
    width: '100%',
  },
  submit: {
    marginBottom: 5,
  },
});

const schemaValidation = Yup.object().shape({
  login: Yup.string().required('Required!'),
  password: Yup.string().required('Required!'),
});

export const FormLogin = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: schemaValidation,
    onSubmit: (values) => dispatch(login(values.login, values.password)),
  });

  return (
    <>
      <TextField
        name="login"
        classes={{
          root: classes.input,
        }}
        value={values.login}
        label="login"
        variant="outlined"
        onChange={handleChange}
        error={touched.login && Boolean(errors.login)}
        helperText={touched.login && errors.login}
      />
      <TextField
        name="password"
        classes={{
          root: classes.input,
        }}
        type="password"
        value={values.password}
        label="password"
        variant="outlined"
        onChange={handleChange}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />
      <Button
        classes={{
          root: classes.submit,
        }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};
