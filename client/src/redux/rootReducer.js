import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../components/LoginForm/loginSlice";
import registerReducer from "../components/RegisterForm/registerSlice";


const appReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}
export default rootReducer;