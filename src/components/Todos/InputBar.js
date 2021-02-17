import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
  TextField,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { createTodo, deleteTodos, updateTodos } from '../../actions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    padding: 5,
  },
});

export const InputBar = ({ visibility, viewTodos, pageViewTodos, setIsSearch }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { search } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const pageViewActiveTodos = useMemo(() => pageViewTodos.filter((todo) => !todo.isCompleted), [
    pageViewTodos,
  ]);

  const viewActiveTodos = useMemo(() => viewTodos.filter((todo) => !todo.isCompleted), [viewTodos]);
  const viewCompletedTodos = useMemo(() => viewTodos.filter((todo) => todo.isCompleted), [
    viewTodos,
  ]);

  const handleOnChangeInputAdd = useCallback((e) => setValue(e.target.value), []);

  const handleOnKeyPressInputAdd = useCallback(
    (e) => {
      if (!value.trim()) return;
      if (e.key === 'Enter') {
        dispatch(createTodo(value.trim()));
        setValue('');
      }
    },
    [value, dispatch],
  );

  const handleOnClickTogglePage = useCallback(
    () =>
      dispatch(
        updateTodos(
          pageViewTodos.map((todo) => todo.id),
          Boolean(pageViewTodos.find((todo) => !todo.isCompleted)),
        ),
      ),
    [dispatch, pageViewTodos],
  );

  const handleOnClickToggleAll = useCallback(
    () =>
      dispatch(
        updateTodos(
          viewTodos.map((todo) => todo.id),
          Boolean(viewTodos.find((todo) => !todo.isCompleted)),
        ),
      ),
    [viewTodos],
  );

  const handleOnClickClearCompletedAll = useCallback(
    () => dispatch(deleteTodos(viewActiveTodos.map((todo) => todo.id))),
    [dispatch, viewActiveTodos],
  );

  const handleOnClickMoreAction = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleOnCloseMoreAction = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOnClickSearch = useCallback(() => setIsSearch(true), []);

  return (
    <>
      <TextField
        classes={{
          root: classes.root,
        }}
        variant="outlined"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleOnChangeInputAdd}
        onKeyPress={handleOnKeyPressInputAdd}
        InputProps={{
          startAdornment: visibility && (
            <InputAdornment position="start">
              <IconButton onClick={handleOnClickTogglePage}>
                <KeyboardArrowDownIcon
                  style={{ color: pageViewActiveTodos.length ? 'lightgray' : 'black' }}
                />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleOnClickSearch}>
                <SearchIcon color={search? 'primary': 'default'} />
              </IconButton>
              {visibility && (
                <IconButton onClick={handleOnClickMoreAction} style={{ width: 30, height: 30 }}>
                  <MoreVertIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
          className: classes.text,
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleOnCloseMoreAction}
      >
        <List>
          <ListItem
            button
            onClick={handleOnClickClearCompletedAll}
            disabled={!viewCompletedTodos.length}
          >
            <ListItemIcon>
              <IconButton style={{ width: 40 }}>
                <Badge
                  max={999}
                  badgeContent={viewCompletedTodos.length}
                  color="primary"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <DeleteIcon />
                </Badge>
              </IconButton>
            </ListItemIcon>
            <ListItemText>Clear completed all</ListItemText>
          </ListItem>
          <ListItem button onClick={handleOnClickToggleAll}>
            <ListItemIcon>
              <Checkbox
                checked={Boolean(viewCompletedTodos.length) && Boolean(viewTodos.length)}
                indeterminate={
                  viewCompletedTodos.length !== viewTodos.length &&
                  Boolean(viewCompletedTodos.length)
                }
                disabled={!viewTodos.length}
              />
            </ListItemIcon>
            <ListItemText>Toggle all</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

InputBar.defaultProps = {
  visibility: false,
  viewTodos: [],
  pageViewTodos: [],
  setIsSearch: () => null,
};

InputBar.propTypes = {
  visibility: PropTypes.bool,
  viewTodos: PropTypes.arrayOf(PropTypes.object),
  pageViewTodos: PropTypes.arrayOf(PropTypes.object),
  setIsSearch: PropTypes.func,
};
