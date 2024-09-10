/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Box, Button, Text } from "rebass";
import { Global } from "@emotion/react";
import NavBar from "../Navbar/Navbar";
import { globalStyles } from "../styles/styles";

import { RootState } from "../store/configureStore";
import { fetchArtistsRequest } from "../Artists/artistsSlice";
import { fetchGenresRequest } from "../Genres/genresSlice";
import { fetchSongsRequest } from "./songsSlice";

import Dialog from "rc-dialog";
import CreateSong from "./CreateSong";
import { filtersStyle, pageStyle, resetButtonStyle } from "./styles";
import SongsListItem from "./SongsListItem";

interface Option {
  value: string;
  label: string;
}

const AllSongsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );
  const { artists } = useSelector((state: RootState) => state.artists);

  const { genres } = useSelector((state: RootState) => state.genres);

  const [selectedArtist, setSelectedArtist] = useState<Option | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Option | null>(null);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(fetchArtistsRequest()); // Fetch artists from store
    dispatch(fetchGenresRequest()); // Fetch genres from store
  }, [dispatch]);

  const handleResetFilters = () => {
    setSelectedArtist(null);
    setSelectedGenre(null);
  };

  const handleAddSong = () => {
    showDialog();
  };

  // Filter songs based on selected artist and genre
  const filteredSongs = songs.filter((song) => {
    const artistMatches = selectedArtist
      ? song.artist?.name === selectedArtist.label
      : true;
    const genreMatches = selectedGenre
      ? song.genre?.title === selectedGenre.label
      : true;
    return artistMatches && genreMatches;
  });

  // Map artists and genres to options for react-select
  const artistOptions = artists.map((artist) => ({
    value: artist._id,
    label: artist.name,
  }));

  const genreOptions = genres.map((genre) => ({
    value: genre._id,
    label: genre.title,
  }));

  return (
    <Box>
      <Global styles={globalStyles} />

      <Dialog
        visible={visible}
        onClose={hideDialog}
        title="Add Song"
        closable={true}
        children={<CreateSong />}
      />

      <NavBar />
      <Box css={pageStyle}>
        <Box css={filtersStyle}>
          <Select
            options={artistOptions}
            placeholder="Filter by Artist"
            value={selectedArtist}
            onChange={(option) => setSelectedArtist(option)}
            isClearable
          />
          <Select
            options={genreOptions}
            placeholder="Filter by Genre"
            value={selectedGenre}
            onChange={(option) => setSelectedGenre(option)}
            isClearable
          />
          <Button css={resetButtonStyle} onClick={handleResetFilters}>
            Reset Filters
          </Button>

          <Button css={resetButtonStyle} onClick={handleAddSong}>
            Add Song
          </Button>
        </Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red">Error: {error}</Text>
        ) : filteredSongs.length === 0 ? (
          <Text>No songs match the selected filters.</Text>
        ) : (
          filteredSongs.map((song) => (
            <SongsListItem key={song._id} song={song} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default AllSongsPage;
