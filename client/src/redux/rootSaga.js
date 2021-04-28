import { loginStart, startLogin } from "../components/LoginForm/loginSlice";
import { all, takeLatest } from "redux-saga/effects";
import { registerStart, startRegister } from "../components/RegisterForm/registerSlice";
import { createPost, createPostStart } from "../components/Posts/CreatePostForm/createPostSlice";
import { fetchPosts, getPosts } from "../components/Posts/getPostsSlice";
import { deletePost, startPostDelete } from "../components/Posts/Post/postDeleteSlice";
import { updatePostStart, updatePost } from "../components/Posts/UpdatePostForm/updatePostSlice";
import { signOut, signOutStart } from "../components/Navbar/signOut";

function* watchLoginSaga() {
	yield takeLatest(loginStart, startLogin);
}

function* watchRegisterSaga() {
	yield takeLatest(registerStart, startRegister);
}

function* watchCreatePostSaga() {
	yield takeLatest(createPostStart, createPost);
}

function* watchGetPostsSaga() {
	yield takeLatest(getPosts, fetchPosts);
}

function* watchPostDeleteSaga() {
	yield takeLatest(startPostDelete, deletePost);
}

function* watchPostUpdateSaga() {
	yield takeLatest(updatePostStart, updatePost);
}

function* watchSignOutSaga() {
	yield takeLatest(signOutStart, signOut);
}

export function* rootSaga() {
	yield all([
		watchLoginSaga(),
		watchRegisterSaga(),
		watchCreatePostSaga(),
		watchGetPostsSaga(),
		watchPostDeleteSaga(),
		watchPostUpdateSaga(),
		watchSignOutSaga()
	]);
}