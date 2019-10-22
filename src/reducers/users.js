import { USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE } from '../actions';

const users = (
  state = {
    isLoading: true,
    list: [],
  },
  action,
) => {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case USERS_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

// selectors
export const getSelectedUser = state =>
  state.users.list.find(user => user.id === state.ui.selectedUserId);

export default users;
