import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
}

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } = songsSlice.actions;
export default songsSlice.reducer;
