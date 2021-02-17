import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';
import { editTitleTodo } from '../../actions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
  },
  input: {
    fontSize: 24,
  },
});

export const InputEditTodo = ({ id, title, setIsEdit }) => {
  const classes = useStyles();

  const inputEdit = useRef();
  const [value, setValue] = useState(title);

  const dispatch = useDispatch();

  useEffect(() => {
    inputEdit.current.focus();
  }, []);

  const handleOnBlurEditTitle = useCallback(() => setIsEdit(false), []);
  const handleOnChangeEditTitle = useCallback((e) => setValue(e.target.value), []);
  const handleOnKeyPressEditTitle = useCallback(
    (e) => {
      if (!value.trim()) return;
      if (e.key === 'Enter') {
        dispatch(editTitleTodo(id, value.trim()));
        setValue('');
        setIsEdit(false);
      }
    },
    [dispatch, value],
  );

  return (
    <TextField
      classes={{
        root: classes.root,
      }}
      InputProps={{
        className: classes.input,
      }}
      variant="outlined"
      type="text"
      value={value}
      inputRef={inputEdit}
      onBlur={handleOnBlurEditTitle}
      onChange={handleOnChangeEditTitle}
      onKeyPress={handleOnKeyPressEditTitle}
    />
  );
};

InputEditTodo.defaultProps = {
  id: 0,
  title: '',
  setIsEdit: () => null,
};

InputEditTodo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  setIsEdit: PropTypes.func,
};
