import {
  SET_DISABLE_END_DATE,
  SET_DISABLE_START_DATE,
  SET_END_DATE,
  SET_SEARCH_TEXT,
  SET_START_DATE,
} from '../constants';

const filters = (
  state = {
    start: '',
    disableStart: false,
    end: '',
    disableEnd: false,
    search: '',
  },
  { type, payload },
) => {
  switch (type) {
    case SET_START_DATE:
      return { ...state, start: payload.date };
    case SET_END_DATE:
      return { ...state, end: payload.date };
    case SET_DISABLE_START_DATE:
      return { ...state, disableStart: payload.disabled };
    case SET_DISABLE_END_DATE:
      return { ...state, disableEnd: payload.disabled };
    case SET_SEARCH_TEXT:
      return { ...state, search: payload.text };
    default:
      return state;
  }
};

export default filters;
