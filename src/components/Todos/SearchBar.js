import React, {useCallback, useState} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import * as PropTypes from 'prop-types';
import { setSearchText } from '../../actions';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  text: {
    fontSize: 20,
    padding: 5,
  },
});

export const SearchBar = ({ setIsSearch }) => {
  const { search } = useSelector((state) => state.filters);
  const [isHover, setIsHover] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnMouseEnter = useCallback(() => setIsHover(true), []);
  const handleOnMouseLeave = useCallback(() => setIsHover(false), []);
  const handleOnClickClose = useCallback(() => setIsSearch(false), []);
  const handleOnClickClear = useCallback(() => dispatch(setSearchText('')), []);
  const handleOnChange = useCallback((event) => dispatch(setSearchText(event.target.value)), []);

  return (
    <TextField
      classes={{
        root: classes.root,
      }}
      variant="outlined"
      value={search}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {isHover ? (
              <IconButton onClick={handleOnClickClose}>
                <ArrowLeftIcon />
              </IconButton>
            ) : (
              <IconButton>
                <SearchIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
        endAdornment: search && (
          <InputAdornment position="end">
            <IconButton onClick={handleOnClickClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        className: classes.text,
      }}
      onChange={handleOnChange}
    />
  );
};

SearchBar.defaultProps = {
  setIsSearch: () => null,
};

SearchBar.propTypes = {
  setIsSearch: PropTypes.func,
};
