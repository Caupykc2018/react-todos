import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { TitleContext } from './titleContext';

export const TitleState = ({ children }) => {
  const [title, setTitle] = useState('');

  return <TitleContext.Provider value={{ title, setTitle }}>{children}</TitleContext.Provider>;
};

TitleState.defaultProps = {
  children: null,
};

TitleState.propTypes = {
  children: PropTypes.element,
};
