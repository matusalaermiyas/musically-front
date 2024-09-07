import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenreStatistics {
  genre: string;
  totalSongs: number;
}

interface ArtistStatistics {
  artist: string;
  totalAlbums: number;
  totalSongs: number;
}

interface AlbumStatistics {
  album: string;
  totalSongs: number;
}

export interface Statistics {
  totalGenres: number;
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalSongsInGenre: GenreStatistics[];
  totalSongsAndAlbumsForArtist: ArtistStatistics[];
  totalSongsForAlbum: AlbumStatistics[];
}

interface StatisticsState {
  statistics: Statistics;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  statistics: {
    totalGenres: 0,
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalSongsInGenre: [],
    totalSongsAndAlbumsForArtist: [],
    totalSongsForAlbum: [],
  },

  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchStatisticsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(state, action: PayloadAction<Statistics>) {
      const {
        totalGenres,
        totalSongs,
        totalAlbums,
        totalArtists,
        totalSongsInGenre,
        totalSongsAndAlbumsForArtist,
        totalSongsForAlbum,
      } = action.payload;
      state.statistics.totalGenres = totalGenres;
      state.statistics.totalSongs = totalSongs;
      state.statistics.totalAlbums = totalAlbums;
      state.statistics.totalArtists = totalArtists;
      state.statistics.totalSongsInGenre = totalSongsInGenre;
      state.statistics.totalSongsAndAlbumsForArtist =
        totalSongsAndAlbumsForArtist;
      state.statistics.totalSongsForAlbum = totalSongsForAlbum;
      state.loading = false;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
