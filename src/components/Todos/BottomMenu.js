import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Button, Fade, makeStyles } from '@material-ui/core';
import { Pagination, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { deleteTodos, setUserTab } from '../../actions';
import { ACTIVE, ALL, COMPLETED } from '../../constants';

const useStyles = makeStyles({
  button: {
    fontSize: 10,
    height: 30,
  },
  bottomMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderTop: '1px solid lightgray',
  },
  textCounting: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descCounter: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 14,
  },
  textCounter: {
    fontSize: 14,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  textButton: {
    fontSize: 10,
  },
});

export const BottomMenu = ({ pageViewTodos, countActiveTodos, tab, page, setPage, countPage }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const pageCompletedTodos = useMemo(() => pageViewTodos.filter((todo) => todo.isCompleted), [
    pageViewTodos,
  ]);

  const handleOnChangeTab = useCallback((event, changedTab) => dispatch(setUserTab(changedTab)), [
    dispatch,
  ]);

  const handleOnClickClearCompleted = useCallback(
    () => dispatch(deleteTodos(pageCompletedTodos.map((todo) => todo.id))),
    [dispatch, pageCompletedTodos],
  );

  const handleOnChangePagination = useCallback((event, value) => {
    setPage(value);
  }, []);

  return (
    <div>
      <div className={classes.bottomMenu}>
        <div className={classes.textCounting}>
          <div className={classes.textCounter}>{countActiveTodos}</div>
          <div className={classes.descCounter}>left items</div>
        </div>
        <ToggleButtonGroup value={tab} variant="outlined" exclusive onChange={handleOnChangeTab}>
          <ToggleButton
            classes={{
              root: classes.button,
            }}
            value={ALL}
          >
            All
          </ToggleButton>
          <ToggleButton
            classes={{
              root: classes.button,
            }}
            value={ACTIVE}
          >
            Active
          </ToggleButton>
          <ToggleButton
            classes={{
              root: classes.button,
            }}
            value={COMPLETED}
          >
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
        <Badge badgeContent={pageCompletedTodos.length} color="primary">
          <Fade in={Boolean(pageCompletedTodos.length)}>
            <Button
              classes={{
                root: classes.button,
                text: classes.textButton,
              }}
              variant="outlined"
              type="button"
              onClick={handleOnClickClearCompleted}
            >
              Clear completed
            </Button>
          </Fade>
        </Badge>
      </div>
      {countPage > 1 && (
        <div className={classes.pagination}>
          <Pagination
            count={countPage}
            variant="outlined"
            page={page}
            onChange={handleOnChangePagination}
          />
        </div>
      )}
    </div>
  );
};

BottomMenu.defaultProps = {
  pageViewTodos: [],
  countActiveTodos: 0,
  tab: 'ALL',
  page: 1,
  setPage: () => null,
  countPage: 0,
};

BottomMenu.propTypes = {
  pageViewTodos: PropTypes.arrayOf(PropTypes.object),
  countActiveTodos: PropTypes.number,
  tab: PropTypes.string,
  page: PropTypes.number,
  setPage: PropTypes.func,
  countPage: PropTypes.number,
};
