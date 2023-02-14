import axios from "axios";
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
} from "../Constants/authConstants";
import { BASE_URL } from "../Constants/Constants";

export const adminLogin = (info) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: ADMIN_LOGIN_REQUEST });
      const { data } = await axios.post(
        `${BASE_URL}/api/admin/login`,
        info,
        config
      );
      console.log(data);
      localStorage.setItem("ADMIN_TOKEN", data.response.token);
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response.data.errors });
    }
  };
};
