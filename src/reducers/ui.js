import { SELECT_USER } from '../actions';

const users = (
  state = {
    selectedUserId: 1,
  },
  action,
) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        selectedUserId: action.id,
      };
    default:
      return state;
  }
};

export default users;
