import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../utils/history";

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
    },
    registerFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetRegisterState(state) {
      state.error = undefined;
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
    history.push("/home");
  } catch (e) {
    if (e.response?.data) {
      yield put(registerFailed(e.response.data));
    }
  }
}