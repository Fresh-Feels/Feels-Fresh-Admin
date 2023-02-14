import {
  ADD_MENU_FAIL,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  GET_SPECIFIC_MENU_FAIL,
  GET_SPECIFIC_MENU_REQUEST,
  GET_SPECIFIC_MENU_SUCCESS,
} from "../Constants/menuConstants";

const initialState = {
  loading: false,
  menu: [],
  msg: "",
  success: false,
  errors: [],
};

export const AddMenuReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADD_MENU_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADD_MENU_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      msg: payload.msg,
      errors: [],
    };
  } else if (type === ADD_MENU_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};


export const GetSpecificMenuReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_SPECIFIC_MENU_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_SPECIFIC_MENU_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      menu: payload,
      errors: [],
    };
  } else if (type === GET_SPECIFIC_MENU_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
