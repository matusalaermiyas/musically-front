import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from './songsSlice';

function fetchSongsApi() {
  return axios.get('http://localhost:8080/songs'); // Replace with your backend URL
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


export {
  watchFetchSongs
} 