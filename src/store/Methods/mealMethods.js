import axios from "axios";
import { BASE_URL } from "../Constants/Constants";
import {
  ADD_MEAL_FAIL,
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  GET_ALL_MEALS_FAIL,
  GET_ALL_MEALS_REQUEST,
  GET_ALL_MEALS_SUCCESS,
} from "../Constants/mealConstants";

export const addMeal = (item) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: ADD_MEAL_REQUEST });
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/meal/add-meal`,
        item,
        config
      );
      dispatch({ type: ADD_MEAL_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_MEAL_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getAllMeals = () => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_ALL_MEALS_REQUEST });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/meal/get-meals`,
        config
      );
      dispatch({ type: GET_ALL_MEALS_SUCCESS, payload: data.meals });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ALL_MEALS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
