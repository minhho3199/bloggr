import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getLoginData } from "../utils/utility";

const initialState = {
	isLoading: false,
  posts: [],
  error: undefined
}

const getPostsSlice = createSlice({
	name: "GetPosts",
	initialState,
	reducers: {
    getPosts() {},
    getPostsSuccess(state, action) {
      state.isLoading = true;
      state.posts = action.payload;
    },
    getPostsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPostsState() {
      return initialState;
    }
	}
});

export default getPostsSlice.reducer;
export const {
  getPosts,
  getPostsSuccess,
  getPostsFailed,
  resetPostsState
} = getPostsSlice.actions;

export function* fetchPosts() {
  try {
    const response = yield call(axios.get, `/posts/get/${getLoginData().id}`);
    yield put(getPostsSuccess(response.data));
  } catch(e) {
    if(e.response?.data) {
      yield put(getPostsFailed(e.response.data));
    }
  }
}