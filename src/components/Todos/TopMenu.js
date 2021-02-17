import React, { useCallback, useState } from 'react';
import { Button, Collapse, Divider, Typography } from '@material-ui/core';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { InputBar } from './InputBar';
import { FilterDataPickers } from './FilterDataPickers';
import { SearchBar } from './SearchBar';

export const TopMenu = ({ visibility, viewTodos, pageViewTodos }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const { search } = useSelector((state) => state.filters);

  const handleOnClickShowFilters = useCallback(() => setShowFilters(!showFilters), [showFilters]);

  return (
    <>
      {!isSearch ? (
        <InputBar
          visibility={visibility}
          viewTodos={viewTodos}
          pageViewTodos={pageViewTodos}
          setIsSearch={setIsSearch}
        />
      ) : (
        <SearchBar setIsSearch={setIsSearch} />
      )}
      <Collapse in={!isSearch && !search && showFilters}>
        <FilterDataPickers />
      </Collapse>
      {!search && !isSearch && (
        <Button style={{ width: '100%' }} onClick={handleOnClickShowFilters}>
          <FilterListSharpIcon />
          <Typography>{`${showFilters ? 'Hide' : 'Show'} filters`}</Typography>
          {showFilters ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
      )}
      <Divider />
    </>
  );
};

TopMenu.defaultProps = {
  visibility: false,
  viewTodos: [],
  pageViewTodos: [],
};

TopMenu.propTypes = {
  visibility: PropTypes.bool,
  viewTodos: PropTypes.arrayOf(PropTypes.object),
  pageViewTodos: PropTypes.arrayOf(PropTypes.object),
};
