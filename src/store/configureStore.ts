import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from '../Songs/songsSlice';
import { watchFetchSongs } from '../Songs/songsSaga';
import albumsReducer from '../Albums/albumsSlice';
import { watchFetchAlbumsSaga } from '../Albums/albumsSaga';
import artistsReducer from '../Artists/artistsSlice';
import { watchFetchArtistsSaga } from '../Artists/artistsSaga';
import genresReducer from '../Genres/genresSlice';
import { watchFetchGenresSaga } from '../Genres/genresSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    albums: albumsReducer, 
    artists: artistsReducer, 
    genres: genresReducer
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(watchFetchSongs);
sagaMiddleware.run(watchFetchAlbumsSaga);
sagaMiddleware.run(watchFetchArtistsSaga);
sagaMiddleware.run(watchFetchGenresSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
