/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsRequest, deleteSongRequest } from "./songsSlice";
import { RootState } from "../store/configureStore";
import Select from "react-select";
import { Box, Button, Card, Text } from "rebass";
import { css, Global } from "@emotion/react";
import { fetchArtistsRequest } from "../Artists/artistsSlice";
import { fetchGenresRequest } from "../Genres/genresSlice";
import NavBar from "../Navbar/Navbar";
import { globalStyles } from "../styles/styles";

const pageStyle = css`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const filtersStyle = css`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const cardStyle = css`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 10px;
`;

const resetButtonStyle = css`
  margin-left: 20px;
  background-color: #007bff;
`;

const editButtonStyle = css`
  background-color: #007bff;
`;

interface Option {
  value: string;
  label: string;
}

const SongsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );
  const { artists } = useSelector((state: RootState) => state.artists);
  const { genres } = useSelector((state: RootState) => state.genres);

  const [selectedArtist, setSelectedArtist] = useState<Option | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Option | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(fetchArtistsRequest()); // Fetch artists from store
    dispatch(fetchGenresRequest()); // Fetch genres from store
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
  };

  const handleResetFilters = () => {
    setSelectedArtist(null);
    setSelectedGenre(null);
  };

  // Filter songs based on selected artist and genre
  const filteredSongs = songs.filter((song) => {
    const artistMatches = selectedArtist
      ? song.artist.name === selectedArtist.label
      : true;
    const genreMatches = selectedGenre
      ? song.genre.title === selectedGenre.label
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
        </Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red">Error: {error}</Text>
        ) : filteredSongs.length === 0 ? (
          <Text>No songs match the selected filters.</Text>
        ) : (
          filteredSongs.map((song) => (
            <Card key={song._id} css={cardStyle}>
              <Box>
                <Text fontWeight="bold">{song.title}</Text>
                <Text>
                  {song.artist.name} - {song.album.title} - {song.genre.title}
                </Text>
              </Box>
              <Box css={buttonGroupStyle}>
                <Button
                  onClick={() => alert(`Edit song: ${song.title}`)}
                  css={editButtonStyle}
                  variant="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(song._id)}
                  variant="outline"
                  color="red"
                >
                  Delete
                </Button>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SongsPage;
