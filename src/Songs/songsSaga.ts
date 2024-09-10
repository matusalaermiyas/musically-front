import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  deleteSongSucess,
  deleteSongFailure,
  deleteSongRequest,
  createSongSuccess,
  createSongFailure,
  createSongRequest,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
} from "./songsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { BackendUrl } from "../config/api";

function fetchSongsApi() {
  return axios.get(`${BackendUrl}/songs`);
}

function* fetchSongsSaga(): any {
  try {
    const response = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* watchFetchSongs() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    const songId = action.payload;
    yield call(axios.delete, `${BackendUrl}/songs/${action.payload}`);
    yield put(deleteSongSucess(songId));
  } catch (error) {
    yield put(deleteSongFailure(error as string));
  }
}

export function* watchDeleteSongSaga() {
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}

function* createSongSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${BackendUrl}/songs`,
      action.payload
    );
    yield put(createSongSuccess(response.data));
  } catch (error: any) {
    yield put(createSongFailure(error.message));
  }
}

export function* watchCreateSongSaga() {
  yield takeLatest(createSongRequest.type, createSongSaga);
}

function* updateSongSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${BackendUrl}/songs/${action.payload.id}`,
      action.payload
    );
    yield put(updateSongSuccess(response.data));
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

export function* watchUpdateSongSaga() {
  yield takeLatest(updateSongRequest.type, updateSongSaga);
}

export { watchFetchSongs };
