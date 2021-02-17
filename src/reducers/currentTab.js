import { SET_TAB } from '../constants';

const currentTab = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_TAB:
      return {
        ...state,
        [payload.login]: payload.tab,
      };
    default:
      return state;
  }
};

export default currentTab;
