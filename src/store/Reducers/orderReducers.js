import {
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_SPECIFIC_ORDER_FAIL,
  GET_SPECIFIC_ORDER_REQUEST,
  GET_SPECIFIC_ORDER_SUCCESS,
} from "../Constants/orderConstants";

const initialState = {
  loading: false,
  order: {},
  orders: [],
  success: false,
  errors: [],
};

export const GetAllOrdersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_ALL_ORDERS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_ALL_ORDERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      orders: payload,
      errors: [],
    };
  } else if (type === GET_ALL_ORDERS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const GetSpecificOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_SPECIFIC_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_SPECIFIC_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      order: payload,
      errors: [],
    };
  } else if (type === GET_SPECIFIC_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
