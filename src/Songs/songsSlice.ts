import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "../Artists/artistsSlice";
import { Genre } from "../Genres/genresSlice";
import { Album } from "../Albums/albumsSlice";
import { toast } from "react-toastify";

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
      toast.success("Song Deleted Successfully");
    },
    deleteSongFailure(_state, _action: PayloadAction<string>) {
      toast.error("Unable to delete a song");
    },
    createSongRequest: (_state, _action: PayloadAction<any>) => {},
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      toast.success("Song Created, Close Window");
    },
    createSongFailure: (_state, _action: PayloadAction<string>) => {
      toast.error("Error while creating song");
    },

    updateSongRequest(_state, _action: PayloadAction<{}>) {},
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;

      toast.success("Song updated, Close Window");
    },
    updateSongFailure(_state) {
      toast.error("Unable to update song try again");
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
