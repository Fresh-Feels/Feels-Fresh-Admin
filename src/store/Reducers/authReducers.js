import jwt_decode from "jwt-decode";
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
} from "../Constants/authConstants";

const initialState = {
  loading: false,
  token: "",
  msg: "",
  admin: "",
  success: false,
  errors: [],
};

const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("ADMIN_TOKEN");
    return null;
  } else {
    return decodedToken;
  }
};

const token = localStorage.getItem("ADMIN_TOKEN");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initialState.token = token;
    const { id } = decoded;
    initialState.admin = id;
  }
}

export const AdminLoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_LOGIN_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_LOGIN_SUCCESS) {
    const decoded = verifyToken(payload.response.token);
    const { id } = decoded;
    return {
      ...state,
      loading: false,
      success: true,
      token: payload.response.token,
      admin: id,
      msg: payload.msg,
      errors: [],
    };
  } else if (type === ADMIN_LOGIN_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else if (type === ADMIN_LOGOUT) {
    localStorage.removeItem("ADMIN_TOKEN");
    return { ...state, token: "", admin: "" };
  } else {
    return state;
  }
};
