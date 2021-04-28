import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getLoginData } from "../utils/utility";

const initialState = {
  isLoading: false,
  posts: [],
  error: undefined,
  hasMore: true,
  count: 0
}

const getPostsSlice = createSlice({
  name: "GetPosts",
  initialState,
  reducers: {
    getPosts() { },
    getPostsSuccess(state, action) {
      state.isLoading = true;
      state.posts = state.posts.concat(action.payload);
    },
    getPostsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    setCount(state) {
      state.count = state.count + 5 ;
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
  resetPostsState,
  setHasMore,
  setCount
} = getPostsSlice.actions;

export function* fetchPosts(action) {
  try {
    const { count } = action.payload;
    const response = yield call(axios.get, `/posts/get/${getLoginData().id}?count=${count}`);
    // const response = yield call(axios.get, `/posts/get/${getLoginData().id}`);

    if(response.data.length < 5) {
      console.log("HasMore has been set to false");
      yield put(setHasMore(false));
    }
    yield put(getPostsSuccess(response.data));
    yield put(setCount());

  } catch (e) {
    if (e.response?.data) {
      yield put(getPostsFailed(e.response.data));
    }
  }
}