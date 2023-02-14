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

const initialState = {
  loading: false,
  item: {},
  items: [],
  msg: "",
  success: false,
  errors: [],
};

export const AddItemReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADD_ITEM_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADD_ITEM_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      item: payload.item,
      msg: payload.msg,
      errors: [],
    };
  } else if (type === ADD_ITEM_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const GetAllItemsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_ALL_ITEMS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_ALL_ITEMS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      items: payload,
      errors: [],
    };
  } else if (type === GET_ALL_ITEMS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const GetSpecificItemReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_SPECIFIC_ITEM_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_SPECIFIC_ITEM_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      item: payload,
      errors: [],
    };
  } else if (type === GET_SPECIFIC_ITEM_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
