import { message } from "antd";
import { auth, db } from "../../firebase";
import { SET_USER, User, UserActionTypes, UserCredentials } from "./types";

export const setUser = (payload?: User): UserActionTypes => {
  return {
    payload,
    type: SET_USER,
  };
};

export const getUserInfo = async (uid: string) => db().collection("users").doc(uid).get();

export const checkAuthAsync = () => async (
  dispatch: (fn: UserActionTypes) => {}
) => {
  try {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        const cu = await getUserInfo(user.uid);
        const authenticatedUser: any = cu.data();
        console.log(authenticatedUser)
        dispatch(setUser(authenticatedUser));
      } else {
        dispatch(setUser());
      }
    });

  } catch (err) {
    // nada
  }
};

export const loginAsync = (credentials: UserCredentials) => async (
  dispatch: (fn: UserActionTypes) => {}
) => {
  try {
    const { user } = await auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    if (user) {
      const id = user.uid;
      const cu = await getUserInfo(id);
      if (cu.exists && cu.data()) {
        const authenticatedUser: any = cu.data();
        dispatch(setUser(authenticatedUser));
      }
    }
  } catch (err) {
    // TODO display message here
  }
};

export const signUpAsync = (credentials: UserCredentials) => async (
  dispatch: (fn: UserActionTypes) => {}
) => {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    if (user) {
      const cu: User = {
        email: credentials.email,
        id: user.uid,
        name: credentials.name,
        photos: [],
      };
      db().collection("users").doc(user?.uid).set(cu);
      dispatch(setUser(cu));
      message.success("Hey there ! Welcome aboard :)");
    }
  } catch (err) {
    // TODO display message here
  }
};
