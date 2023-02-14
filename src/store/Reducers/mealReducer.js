import {
  ADD_MEAL_FAIL,
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  GET_ALL_MEALS_FAIL,
  GET_ALL_MEALS_REQUEST,
  GET_ALL_MEALS_SUCCESS,
} from "../Constants/mealConstants";

const initialState = {
  loading: false,
  meal: {},
  meals: [],
  msg: "",
  success: false,
  errors: [],
};

export const AddMealReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADD_MEAL_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADD_MEAL_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      meal: payload.meal,
      msg: payload.msg,
      errors: [],
    };
  } else if (type === ADD_MEAL_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const GetAllMealsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_ALL_MEALS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_ALL_MEALS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      meals: payload,
      errors: [],
    };
  } else if (type === GET_ALL_MEALS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
