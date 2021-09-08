import { combineReducers } from "redux";
import AuthReducer from "./Reducer/AuthReducer";
import CategoryReducer from "./Reducer/CategoryReducer";


export const reducers = combineReducers(
    {
      Authentication : AuthReducer,
      categories: CategoryReducer
    }
  )
  