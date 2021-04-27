import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../utils/history";
import jwt_decode from "jwt-decode";
import { createHashHistory } from "history";
import { saveLoginData } from "../utils/utility";

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
			state.error = undefined;
		},
		loginFailed(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		resetLoginState(state) {
			return initialState;
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
		const decoded = jwt_decode(response.data);
		saveLoginData({
			id: decoded.id,
			name: decoded.name,
			email: decoded.email
		});
		window.location.href = "/home";
	} catch (e) {
		if (e.response?.data) {
			yield put(loginFailed(e.response.data));
		}
	}
}