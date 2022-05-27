import { CHANGE, DELETE, GET_DATA, POST_DATA } from "../constants";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_DATA: {
      return [...action.payload];
    }

    case CHANGE: {
      return [
        ...state.map((item) => {
          if (item.key === action.payload.key) {
            return action.payload;
          } else {
            return item;
          }
        }),
      ];
    }
    case POST_DATA: {
      return [...action.payload];
    }

    case DELETE: {
      return [...state.filter((item) => item.key !== action.payload)];
    }

    default:
      return state;
  }
};
export default reducer;
