import { combineReducers } from "redux";
import AuthReducer from "./Reducer/AuthReducer";
import CategoryReducer from "./Reducer/CategoryReducer";
import { itemReducer } from "./Reducer/ItemReducer";


export const reducers = combineReducers(
    {
      Authentication : AuthReducer,
      categories: CategoryReducer,
      item: itemReducer
    }
  )
  