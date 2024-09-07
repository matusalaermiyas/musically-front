import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Genre {
  _id: string;
  title: string;
}

interface GenresState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  genres: [],
  loading: false,
  error: null,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    fetchGenresRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGenresSuccess(state, action: PayloadAction<Genre[]>) {
      state.genres = action.payload;
      state.loading = false;
    },
    fetchGenresFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGenresRequest, fetchGenresSuccess, fetchGenresFailure } =
  genresSlice.actions;

export default genresSlice.reducer;
