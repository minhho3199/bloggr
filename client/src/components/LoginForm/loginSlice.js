import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../utils/history";

const initialState = {
	isLoading: false,
	isLoginSuccess: false,
	error: undefined,
}

const loginSlice = createSlice({
	name: "Login",
	initialState,
	reducers: {
		loginStart(state) {
			state.isLoading = true
		},
		loginSuccess(state) {
			state.isLoading = false;
			state.isLoginSuccess = true;
		},
		loginFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		resetLoginState(state) {
			state.error = undefined;
		}
	}
});

export default loginSlice.reducer;
export const {
	loginStart,
	loginSuccess,
	loginFailed,
	resetLoginState
} = loginSlice.actions;

export function* startLogin(action) {
	try {
		const { email, password } = action.payload;
		const response = yield call(axios.post, "/users/login", { email, password });
		console.log(response);
		yield put(loginSuccess());
		localStorage.setItem("usertoken", response.data);
		history.push("/home");
	} catch (e) {
		if (e.response?.data) {
			yield put(loginFailed(e.response.data));
		}
	}
}