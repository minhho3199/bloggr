import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isCreationSuccess: false,
  error: undefined,
}

const createPostSlice = createSlice({
  name: "CreatePost",
  initialState,
  reducers: {
    createPostStart(state) {
      state.isLoading = true;
    },
    createPostSuccess(state) {
      state.isCreationSuccess = true;
      state.isLoading = false;
    },
    createPostFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetCreatePostState() {
      return initialState;
    }
  }
});

export default createPostSlice.reducer;
export const {
  createPostStart,
  createPostSuccess,
  createPostFailed,
  resetCreatePostState
} = createPostSlice.actions;

export function* createPost(action) {
  try {
    const token = localStorage.usertoken;
    console.log(token);
    var config = {
      headers: {
        'Authorization': token,
      },
    };
    const { title, message, author, postType } = action.payload;
    yield call(axios.post, "/posts/create", { title, message, author, postType }, config);
    yield put(createPostSuccess());
    window.location.href = "/home";
  } catch (e) {
    if (e.response?.data) {
      yield put(createPostFailed(e.response.data));
    }
  }
}
