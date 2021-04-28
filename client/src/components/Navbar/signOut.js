import { put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

export const ResetStoreAction = "ResetStore";

export const resetReduxStore = createAction(ResetStoreAction);
export const signOutStart = createAction("SignOutStart");

export function* signOut() {
  localStorage.clear();
  yield put(resetReduxStore());
  window.location.href = "/";
}