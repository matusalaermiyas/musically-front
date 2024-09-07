import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "../Artists/artistsSlice";
import { Genre } from "../Genres/genresSlice";
import { Album } from "../Albums/albumsSlice";

export interface Song {
  _id: string;
  title: string;
  artist: Artist;
  imageUrl: string;
  genre: Genre;
  album: Album;
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
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest(state, action: PayloadAction<string>) {
      // Handle song deletion here
      console.log("Viewing song to delete");
      console.log(action.payload);
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  deleteSongRequest,
} = songsSlice.actions;

export default songsSlice.reducer;
