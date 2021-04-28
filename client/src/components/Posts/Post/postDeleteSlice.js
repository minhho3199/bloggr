import { call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postId: null,
  isLoading: false,
  isDeleteModalOpen: false,
  isDeleteSuccess: false,
  error: undefined
}

const postDeleteSlice = createSlice({
  name: "PostDelete",
  initialState,
  reducers: {
    setDeleteModalOpen(state, action) {
      state.postId = action.payload.postId;
      state.isDeleteModalOpen = action.payload.isDeleteModalOpen;
    },
    setPostInfo(state, action) {
      state.post = action.payload;
    },
    startPostDelete(state) {
      state.isLoading = true;
    },
    deletePostSuccess(state) {
      state.isDeleteSuccess = true;
      state.isLoading = false;
      state.error = undefined;
    },
    deletePostFailed(state, action) {
      state.isDeleteSuccess = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPostActionState() {
      return initialState;
    }
  }
});

export default postDeleteSlice.reducer;
export const {
  setDeleteModalOpen,
  startPostDelete,
  deletePostSuccess,
  deletePostFailed,
  resetPostActionState,
} = postDeleteSlice.actions;

export function* deletePost(action) {
  try {
    const token = localStorage.usertoken;
    var config = {
      headers: {
        'Authorization': token,
      },
    };
    const { postId } = action.payload;
    yield call(axios.delete, `/posts/delete/${postId}`, config);
    yield put(deletePostSuccess());
    yield put(setDeleteModalOpen({ postId: null, isDeleteModalOpen: false }));
    window.location.href = "/home";
  } catch (e) {
    if (e.response?.data) {
      yield put(deletePostFailed(e.response.data));
    }
  }
}