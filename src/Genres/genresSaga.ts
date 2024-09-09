import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
  Genre,
} from "./genresSlice";
import { BackendUrl } from "../config/config";

// Type for Axios response
type GenresResponse = AxiosResponse<Genre[]>;

// Function to fetch genres from the backend
async function fetchGenresApi(): Promise<Genre[]> {
  const response: GenresResponse = await axios.get<Genre[]>(
    `${BackendUrl}/genres`
  );
  return response.data;
}

// Saga to handle the side effect of fetching genres
function* fetchGenresSaga(): Generator {
  try {
    // Use `call` effect for async operation, typed as `Promise<Genre[]>`
    const genres: Genre[] = (yield call(fetchGenresApi)) as Genre[];
    // Dispatch success action with genres
    yield put(fetchGenresSuccess(genres));
  } catch (error: any) {
    // Dispatch failure action with error message
    yield put(fetchGenresFailure(error.message));
  }
}

// Watcher saga to listen for fetchGenresRequest action
export function* watchFetchGenresSaga(): Generator {
  yield takeLatest(fetchGenresRequest.type, fetchGenresSaga);
}
