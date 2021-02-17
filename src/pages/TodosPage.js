import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, makeStyles, Paper } from '@material-ui/core';
import { NavBar } from '../components/NavBar';
import { BottomMenu } from '../components/Todos/BottomMenu';
import { getAllTodos, refreshToken } from '../actions';
import { Todo } from '../components/Todos/Todo';
import { ACTIVE, ALL, COMPLETED } from '../constants';
import { TitleContext } from '../context/title/titleContext';
import { TopMenu } from '../components/Todos/TopMenu';
import { useDebounce } from '../hooks/useDebounce';

const useStyles = makeStyles({
  app: {
    marginTop: 50,
    marginBottom: 50,
    width: 550,
  },
  list: {
    padding: 0,
  },
  main: {
    backgroundColor: 'white',
  },
});

export const TodosPage = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { setTitle } = useContext(TitleContext);
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    setTitle('Todos');
  }, []);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useDebounce(
    () => {
      dispatch(getAllTodos());
    },
    250,
    [dispatch, filters],
  );

  const isAuth = useSelector((state) => !!state.currentUser.refreshToken);
  const login = useSelector((state) => state.currentUser.login);
  const currentTab = useSelector((state) => state.currentTab[login]);
  const countAllTodos = useSelector((state) => state.todos.length);
  const countCompletedTodos = useSelector(
    (state) => state.todos.filter((todo) => todo.isCompleted).length,
  );
  const countActiveTodos = countAllTodos - countCompletedTodos;
  const viewTodos = useSelector((state) => {
    switch (currentTab) {
      case ALL:
        return state.todos;
      case ACTIVE:
        return state.todos.filter((todo) => !todo.isCompleted);
      case COMPLETED:
        return state.todos.filter((todo) => todo.isCompleted);
      default:
        return state.todos;
    }
  });
  const pageViewTodos = useMemo(() => viewTodos.slice(5 * (page - 1), 5 * page), [viewTodos, page]);
  const countPage = useMemo(
    () => Math.trunc(viewTodos.length / 5) + Number(Boolean(viewTodos.length % 5)),
    [viewTodos],
  );

  useEffect(() => {
    if (countPage && countPage < page) {
      setPage(countPage);
    }
  }, [countPage, page]);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <NavBar />
      <Paper className={classes.app}>
        <TopMenu
          visibility={Boolean(countAllTodos)}
          viewTodos={viewTodos}
          pageViewTodos={pageViewTodos}
        />
        <div className={classes.main}>
          <List classes={{ root: classes.list }}>
            {pageViewTodos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                isCompleted={todo.isCompleted}
                createdAt={todo.createdAt}
              />
            ))}
          </List>
          {Boolean(countAllTodos) && (
            <BottomMenu
              pageViewTodos={pageViewTodos}
              countActiveTodos={countActiveTodos}
              tab={currentTab}
              page={page}
              setPage={setPage}
              countPage={countPage}
            />
          )}
        </div>
      </Paper>
    </>
  );
};
