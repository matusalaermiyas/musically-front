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
    deleteSongRequest(_state, _action: PayloadAction<string>) {},
    deleteSongSucess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    deleteSongFailure(_state, _action: PayloadAction<string>) {
      alert("Error while deleting song");
    },
    createSongRequest: (_state, _action: PayloadAction<any>) => {},
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    createSongFailure: (_state, _action: PayloadAction<string>) => {
      alert("Error while creating song!");
    },

    updateSongRequest(_state, _action: PayloadAction<{}>) {},
    updateSongSuccess(state, action: PayloadAction<Song>) {
      console.log("Viewing returned data");
      console.log(action.payload);

      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure(_state) {
      alert("Error while updating song");
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,

  deleteSongRequest,
  deleteSongSucess,
  deleteSongFailure,

  createSongRequest,
  createSongFailure,
  createSongSuccess,

  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
