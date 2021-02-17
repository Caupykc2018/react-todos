import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DataPicker } from './DataPicker';
import { setDisableEndDate, setDisableStartDate, setEndDate, setStartDate } from '../../actions';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export const FilterDataPickers = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { disableStart, disableEnd, start, end } = useSelector((state) => state.filters);

  const handleOnChangeStartDate = useCallback((event) => {
    dispatch(setStartDate(event.target.value));
  }, []);

  const handleOnChangeEndDate = useCallback((event) => {
    dispatch(setEndDate(event.target.value));
  }, []);

  const handleOnChangeStartDisabled = useCallback(() => {
    dispatch(setDisableStartDate(!disableStart));
  }, [disableStart]);

  const handleOnChangeEndDisabled = useCallback(() => {
    dispatch(setDisableEndDate(!disableEnd));
  }, [disableEnd]);

  return (
    <div className={classes.container}>
      <DataPicker
        label="Start date"
        onChangeDate={handleOnChangeStartDate}
        onChangeDisabled={handleOnChangeStartDisabled}
        value={start}
        disabled={disableStart}
      />
      <DataPicker
        label="End date"
        onChangeDate={handleOnChangeEndDate}
        onChangeDisabled={handleOnChangeEndDisabled}
        value={end}
        disabled={disableEnd}
      />
    </div>
  );
};
