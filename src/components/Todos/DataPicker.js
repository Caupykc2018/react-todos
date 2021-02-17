import React from 'react';
import { Checkbox, makeStyles, TextField } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  dataPicker: {
    width: 190,
  },
});

export const DataPicker = ({ label, onChangeDate, onChangeDisabled, disabled }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        label={label}
        classes={{
          root: classes.dataPicker,
        }}
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        disabled={disabled}
        onChange={onChangeDate}
      />
      <Checkbox onChange={onChangeDisabled} checked={!disabled} />
    </div>
  );
};

DataPicker.defaultProps = {
  label: '',
  onChangeDate: () => null,
  onChangeDisabled: () => null,
  disabled: false,
};

DataPicker.propTypes = {
  label: PropTypes.string,
  onChangeDate: PropTypes.func,
  onChangeDisabled: PropTypes.func,
  disabled: PropTypes.bool,
};
