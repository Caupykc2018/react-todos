import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from '../constants';

const notification = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_NOTIFICATION:
      return payload.notification;
    case CLEAR_NOTIFICATION:
      return {};
    default:
      return state;
  }
};

export default notification;
