import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { AdminLoginReducer } from "./Reducers/authReducers";
import {
  AddItemReducer,
  GetAllItemsReducer,
  GetSpecificItemReducer,
} from "./Reducers/itemReducers";
import {
  GetAllOrdersReducer,
  GetSpecificOrderReducer,
} from "./Reducers/orderReducers";
import { AddMealReducer, GetAllMealsReducer } from "./Reducers/mealReducer";
import { AddMenuReducer, GetSpecificMenuReducer } from "./Reducers/menuMethods";

const rootReducers = combineReducers({
  AdminLoginReducer,

  AddItemReducer,
  GetAllItemsReducer,
  GetSpecificItemReducer,

  GetAllOrdersReducer,
  GetSpecificOrderReducer,

  AddMealReducer,
  GetAllMealsReducer,

  AddMenuReducer,
  GetSpecificMenuReducer,
});

const middlewares = [thunkMiddleware];
const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default Store;
