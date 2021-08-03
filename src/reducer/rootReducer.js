import { combineReducers } from "redux";
import listColorReducer from "./listColorReducer";
import titleReducer from "./titleReducer";

export default combineReducers({
  listColorReducer,
  titleReducer,
});
