import axios from "axios";
import { BASE_URL } from "../Constants/Constants";
import {
  ADD_MENU_FAIL,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  GET_SPECIFIC_MENU_FAIL,
  GET_SPECIFIC_MENU_REQUEST,
  GET_SPECIFIC_MENU_SUCCESS,
} from "../Constants/menuConstants";

export const addMenu = (item) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: ADD_MENU_REQUEST });
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/menu/add-menu`,
        item,
        config
      );
      dispatch({ type: ADD_MENU_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_MENU_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getSpecificMenu = (id) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_SPECIFIC_MENU_REQUEST });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/menu/get-menu/${id}`,
        config
      );
      dispatch({ type: GET_SPECIFIC_MENU_SUCCESS, payload: data.menu });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_SPECIFIC_MENU_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
