// Action Types
export const SET_USER = "SET_USER";

export interface User {
  name?: string;
  email: string;
  id: string;
  photos: string[],
}

// State Type
export interface UserState {
  user?: User;
}

export interface UserCredentials {
  email: string;
  password: string;
  name?: string;
}


// Action Creators Types
interface SetUserAction {
    type: typeof SET_USER;
    payload?: User;
  }
  

export type UserActionTypes = SetUserAction;

