import { SET_ERROR } from '../constants';

const error = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return payload.error;
    default:
      return state;
  }
};

export default error;
