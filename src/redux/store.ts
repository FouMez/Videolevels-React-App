import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import auth from "./auth/reducer";


const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;


export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
