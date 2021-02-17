import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { deleteTodo, toggleStatusTodo } from '../../actions';
import { InputEditTodo } from './InputEditTodo';

const useStyles = makeStyles({
  text: {
    fontSize: 20,
    wordBreak: 'break-word',
  },
  icon: {
    fontSize: 30,
  },
  checkbox: {
    width: 10,
  },
});

export const Todo = ({ id, title, isCompleted, createdAt }) => {
  const [isEdit, setIsEdit] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnDoubleOnEdit = useCallback(() => setIsEdit(true), []);
  const handleOnChangeToggle = useCallback(() => dispatch(toggleStatusTodo(id, !isCompleted)), [
    dispatch,
    isCompleted,
  ]);
  const handleOnClickDelete = useCallback(() => dispatch(deleteTodo(id)), [dispatch]);

  if (isEdit) {
    return <InputEditTodo id={id} title={title} setIsEdit={setIsEdit} />;
  }

  return (
    <ListItem onDoubleClick={handleOnDoubleOnEdit}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          icon={<CheckCircleOutlinedIcon fontSize="large" />}
          checkedIcon={<CheckCircleIcon fontSize="large" />}
          onChange={handleOnChangeToggle}
          checked={isCompleted}
        />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          className: classes.text,
          style: {
            textDecoration: isCompleted ? 'line-through' : 'none',
            color: isCompleted ? 'lightgray' : 'black',
          },
        }}
        primary={title}
        secondary={moment(createdAt).calendar()}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleOnClickDelete}>
          <DeleteIcon fontSize="large" className={classes.icon} style={{ color: 'red' }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Todo.defaultProps = {
  id: 0,
  title: '',
  isCompleted: false,
  createdAt: new Date().toString(),
};

Todo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isCompleted: PropTypes.bool,
  createdAt: PropTypes.string,
};
