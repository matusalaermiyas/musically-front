import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { fetchArtistsRequest, fetchArtistsSuccess, fetchArtistsFailure } from './artistsSlice';

// Define the Artist type (same as in the artistsSlice)
interface Artist {
  id: number;
  name: string;
  genre: string;
  imageUrl: string;
}

// Type for Axios response
type ArtistsResponse = AxiosResponse<Artist[]>;

// Function to fetch artists from the backend
async function fetchArtistsApi(): Promise<Artist[]> {
  const response: ArtistsResponse = await axios.get<Artist[]>('http://localhost:8080/artists');
  return response.data;
}

// Saga to handle the side effect of fetching artists
function* fetchArtistsSaga(): Generator {
  try {
    // Use `call` effect for async operation, typed as `Promise<Artist[]>`
    const artists: Artist[] = (yield call(fetchArtistsApi)) as Artist[];
    // Dispatch success action with artists
    yield put(fetchArtistsSuccess(artists));
  } catch (error: any) {
    // Dispatch failure action with error message
    yield put(fetchArtistsFailure(error.message));
  }
}

// Watcher saga to listen for fetchArtistsRequest action
export function* watchFetchArtistsSaga(): Generator {
  yield takeLatest(fetchArtistsRequest.type, fetchArtistsSaga);
}
