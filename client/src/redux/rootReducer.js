import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../components/LoginForm/loginSlice";
import registerReducer from "../components/RegisterForm/registerSlice";
import createPostReducer from "../components/Posts/CreatePostForm/createPostSlice";
import getPostsReducer from "../components/Posts/getPostsSlice";
import postDeleteReducer from "../components/Posts/Post/postDeleteSlice";
import postUpdateReducer from "../components/Posts/UpdatePostForm/updatePostSlice";

const appReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer,
    createPostState: createPostReducer,
    getPostsState: getPostsReducer,
    postDeleteState: postDeleteReducer,
    postUpdateState: postUpdateReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}
export default rootReducer;