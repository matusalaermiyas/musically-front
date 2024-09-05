import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Artist {
  _id: string;
  name: string;
  genre: string;
  imageUrl: string;
}

interface ArtistsState {
  artists: Artist[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtistsState = {
  artists: [],
  loading: false,
  error: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    fetchArtistsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistsSuccess(state, action: PayloadAction<Artist[]>) {
      state.artists = action.payload;
      state.loading = false;
    },
    fetchArtistsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchArtistsRequest, fetchArtistsSuccess, fetchArtistsFailure } = artistsSlice.actions;

export default artistsSlice.reducer;
