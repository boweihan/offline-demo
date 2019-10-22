import {
  CHECK_OUTS_FETCH_SUCCESS,
  CHECK_OUT_SUCCESS,
  CHECK_IN_SUCCESS,
} from '../actions';

const checkOuts = (
  state = {
    isLoading: true,
    list: [],
  },
  action,
) => {
  let list;
  switch (action.type) {
    case CHECK_OUTS_FETCH_SUCCESS:
      return {
        isLoading: false,
        list: action.payload,
      };
    case CHECK_OUT_SUCCESS:
      list = [...state.list];
      list.push(action.payload);
      return {
        ...state,
        list,
      };
    case CHECK_IN_SUCCESS:
      list = [...state.list];
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === action.payload.id) {
          list.splice(i, 1, action.payload);
        }
      }
      return {
        ...state,
        list,
      };
    default:
      return state;
  }
};

const isCheckedOut = checkOut => !checkOut.timestampIn;

// selectors

// The API returns all historical check outs, including those that
// have been checked in. Get currently active check outs only.
export const getCurrentCheckOuts = state => {
  return state.checkOuts.list.filter(isCheckedOut);
};

export default checkOuts;
