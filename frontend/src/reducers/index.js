import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cmsReducer from "./cmsReducer";
import shoppingReducer from "./shoppingReducer";
import miscReducer from "./miscReducer";

export default combineReducers({
  userReducer,
  cmsReducer,
  shoppingReducer,
  miscReducer,
});
