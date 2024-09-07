import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "../Artists/artistsSlice";

export interface Album {
  _id: string;
  title: string;
  artist: Artist;
  imageUrl: string;
}

interface AlbumsState {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumsState = {
  albums: [],
  loading: false,
  error: null,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    fetchAlbumsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumsSuccess(state, action: PayloadAction<Album[]>) {
      state.albums = action.payload;
      state.loading = false;
    },
    fetchAlbumsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchAlbumsRequest, fetchAlbumsSuccess, fetchAlbumsFailure } =
  albumsSlice.actions;

export default albumsSlice.reducer;
