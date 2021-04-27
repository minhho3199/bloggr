import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPosts } from "../getPostsSlice";

const initialState = {
  post: null,
  isLoading: false,
  isUpdateSuccess: false,
  error: undefined,
}

const updatePostSlice = createSlice({
  name: "UpdatePost",
  initialState,
  reducers: {
    setPostInfo(state, action) {
      state.post = action.payload;
    },
    updatePostStart(state) {
      state.isLoading = true;
    },
    updatePostSuccess(state) {
      state.isCreationSuccess = true;
      state.isLoading = false;
    },
    updatePostFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetUpdatePostState() {
      return initialState;
    }
  }
});

export default updatePostSlice.reducer;
export const {
  updatePostStart,
  updatePostSuccess,
  updatePostFailed,
  resetUpdatePostState,
  setPostInfo,
} = updatePostSlice.actions;

export function* updatePost(action) {
  try {
    const token = localStorage.usertoken;
    var config = {
      headers: {
        'Authorization': token,
      },
    };
    const { postId, title, message, author, postType } = action.payload;
    console.log(action.payload);
    yield call(axios.post, `/posts/update/${postId}`, { title, message, author, postType }, config);
    yield put(updatePostSuccess());
    window.location.href = "/home";
  } catch (e) {
    if (e.response?.data) {
      yield put(updatePostFailed(e.response.data));
    }
  }
}
