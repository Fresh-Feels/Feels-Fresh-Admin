import axios from "axios";
import {
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_SPECIFIC_ORDER_FAIL,
  GET_SPECIFIC_ORDER_REQUEST,
  GET_SPECIFIC_ORDER_SUCCESS,
} from "../Constants/orderConstants";
import { BASE_URL } from "../Constants/Constants";

export const getAllOrders = () => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/order/get-orders`,
        config
      );
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ALL_ORDERS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getSpecificOrders = (id) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: GET_SPECIFIC_ORDER_REQUEST });
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/order/get-order/${id}`,
        config
      );
      dispatch({ type: GET_SPECIFIC_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_SPECIFIC_ORDER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
