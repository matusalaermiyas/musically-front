import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  watchCreateSongSaga,
  watchDeleteSongSaga,
  watchFetchSongs,
  watchUpdateSongSaga,
} from "../Songs/songsSaga";
import { watchFetchAlbumsSaga } from "../Albums/albumsSaga";
import { watchFetchArtistsSaga } from "../Artists/artistsSaga";
import { watchFetchGenresSaga } from "../Genres/genresSaga";
import { watchFetchStatisticsSaga } from "../Statistics/statisticsSaga";

import artistsReducer from "../Artists/artistsSlice";
import songsReducer from "../Songs/songsSlice";
import albumsReducer from "../Albums/albumsSlice";
import genresReducer from "../Genres/genresSlice";
import statisticsReducer from "../Statistics/statisticsSlice";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    albums: albumsReducer,
    artists: artistsReducer,
    genres: genresReducer,
    statistcs: statisticsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(watchFetchSongs);
sagaMiddleware.run(watchFetchAlbumsSaga);
sagaMiddleware.run(watchFetchArtistsSaga);
sagaMiddleware.run(watchFetchGenresSaga);
sagaMiddleware.run(watchFetchStatisticsSaga);
sagaMiddleware.run(watchDeleteSongSaga);
sagaMiddleware.run(watchCreateSongSaga);
sagaMiddleware.run(watchUpdateSongSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
