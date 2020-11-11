import { SET_USER, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
  user: undefined,
};

export default (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
