import { combineReducers } from "redux";
import jobReducer from "./reducers/jobReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
});
export default rootReducer;
