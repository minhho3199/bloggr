import { loginStart, startLogin } from "../components/LoginForm/loginSlice";
import { all, takeLatest } from "redux-saga/effects";
import { registerStart, startRegister } from "../components/RegisterForm/registerSlice";

export function* watchLoginSaga() {
    yield takeLatest(loginStart, startLogin);
}

export function* watchRegisterSaga() {
    yield takeLatest(registerStart, startRegister);
}
export function* rootSaga() {
    yield all([
        watchLoginSaga(),
        watchRegisterSaga()
    ]);
}