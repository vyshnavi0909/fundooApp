import { combineReducers } from "redux";
import itemColorReducer from "./itemColorReducer";
import headerReducer from "./headerReducer";

export default combineReducers({
  itemColorReducer,
  headerReducer,
});
