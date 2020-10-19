import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./loginReducer";
import fsCmmnArrayReducer from "./fsCmmnArrayReducer";
import placesReducer from "./placesReducer";
import cudReducer from "./cudReducer";
import languageReducer from "./languageReducer";

const rootReducer = combineReducers({
  loginReducer,
  fsCmmnArrayReducer,
  placesReducer,
  cudReducer,
  languageReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
export type rootState = ReturnType<typeof rootReducer>;
