import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../actions';

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
  login: Yup.string()
    .min(3, 'Login must have at least 3 characters')
    .max(16, 'The maximum login length is 16 characters')
    .required('Required!'),
  password: Yup.string()
    .min(8, 'Password must have at least 8 characters')
    .max(32, 'The maximum password length is 32 characters')
    .required('Required!'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Repeat password must be identical to password')
    .required('Required!'),
});

export const FormAddUser = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      login: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: schemaValidation,
    onSubmit: (values) => {
      dispatch(register(values.login, values.password));
    },
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
        error={touched.login && Boolean(errors.login)}
        onChange={handleChange}
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
        error={touched.password && Boolean(errors.password)}
        onChange={handleChange}
        helperText={touched.password && errors.password}
      />
      <TextField
        name="repeatPassword"
        classes={{
          root: classes.input,
        }}
        type="password"
        value={values.repeatPassword}
        label="repeat password"
        variant="outlined"
        error={touched.repeatPassword && Boolean(errors.repeatPassword)}
        onChange={handleChange}
        helperText={touched.repeatPassword && errors.repeatPassword}
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
