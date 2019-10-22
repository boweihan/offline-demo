import {
  CHECK_OUTS_FETCH_SUCCESS,
  CHECK_OUTS_FETCH_FAILURE,
  CHECK_OUT_SUCCESS,
  CHECK_IN_SUCCESS,
  CHECK_OUT_FAILURE,
  CHECK_IN_FAILURE,
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
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case CHECK_OUTS_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
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
    // handle offline interactions
    case CHECK_OUT_FAILURE:
      list = [...state.list];
      list.push(action.meta.offline);
      // queue up the network request
      return { ...state, list };
    case CHECK_IN_FAILURE:
      list = [...state.list];
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === action.meta.offline.id) {
          list[i] = { ...list[i], ...action.meta.offline };
          // queue up the network request
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
