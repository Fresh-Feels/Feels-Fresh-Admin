import axios from "axios";
import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  GET_ALL_ITEMS_FAIL,
  GET_ALL_ITEMS_REQUEST,
  GET_ALL_ITEMS_SUCCESS,
  GET_SPECIFIC_ITEM_FAIL,
  GET_SPECIFIC_ITEM_REQUEST,
  GET_SPECIFIC_ITEM_SUCCESS,
} from "../Constants/itemConstants";
import { BASE_URL } from "../Constants/Constants";

export const addItem = (item) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: ADD_ITEM_REQUEST });
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/item/add-item`,
        item,
        config
      );
      dispatch({ type: ADD_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_ITEM_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getAllItems = () => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_ALL_ITEMS_REQUEST });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/item/get-items`,
        config
      );
      dispatch({ type: GET_ALL_ITEMS_SUCCESS, payload: data.items });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ALL_ITEMS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getSpecificItem = (id) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_SPECIFIC_ITEM_REQUEST });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/item/get-item/${id}`,
        config
      );
      dispatch({ type: GET_SPECIFIC_ITEM_SUCCESS, payload: data.item });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_SPECIFIC_ITEM_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
