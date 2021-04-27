import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../utils/history";
import jwt_decode from "jwt-decode";
import { createHashHistory } from "history";
import { saveLoginData } from "../utils/utility";

const initialState = {
  isLoading: false,
  isRegisterSuccess: false,
  error: undefined,
}

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    registerStart(state) {
      state.isLoading = true
    },
    registerSuccess(state) {
      state.isLoading = false;
      state.isRegisterSuccess = true;
      state.error = undefined;
    },
    registerFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetRegisterState(state) {
      return initialState;
    }
  }
});

export default registerSlice.reducer;
export const {
  registerStart,
  registerSuccess,
  registerFailed,
  resetRegisterState
} = registerSlice.actions;


export function* startRegister(action) {
  try {
    const { email, name, password } = action.payload;
    const response = yield call(axios.post, "/users/register", { email, name, password });
    yield put(registerSuccess());
    localStorage.setItem("usertoken", response.data);
		const decoded = jwt_decode(response.data);
		saveLoginData({
			id: decoded.id,
			name: decoded.name,
			email: decoded.email
		});
		window.location.href = "/home";
  } catch (e) {
    if (e.response?.data) {
      yield put(registerFailed(e.response.data));
    }
  }
}