import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  Album,
} from "./albumsSlice";
import { BackendUrl } from "../config/api";

// Type for Axios response
type AlbumsResponse = AxiosResponse<Album[]>;

// Function to fetch albums from the backend
async function fetchAlbumsApi(): Promise<Album[]> {
  const response: AlbumsResponse = await axios.get<Album[]>(
    `${BackendUrl}/albums`
  );
  return response.data;
}

// Saga to handle the side effect of fetching albums
function* fetchAlbumsSaga(): Generator {
  try {
    // Use `call` effect for async operation, typed as `Promise<Album[]>`
    const albums: Album[] = (yield call(fetchAlbumsApi)) as Album[];
    // Dispatch success action with albums
    yield put(fetchAlbumsSuccess(albums));
  } catch (error: any) {
    // Dispatch failure action with error message
    yield put(fetchAlbumsFailure(error.message));
  }
}

// Watcher saga to listen for fetchAlbumsRequest action
export function* watchFetchAlbumsSaga(): Generator {
  yield takeLatest(fetchAlbumsRequest.type, fetchAlbumsSaga);
}
