/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

import { css } from "@emotion/react";
import { fetchArtistsRequest } from "../Artists/artistsSlice";
import { fetchAlbumsRequest } from "../Albums/albumsSlice";
import { fetchGenresRequest } from "../Genres/genresSlice";
import { Song, updateSongRequest } from "./songsSlice";

interface EditSongProps {
  songId: string;
}

interface Option {
  value: string;
  label: string;
}

const EditSong: React.FC<EditSongProps> = ({ songId }) => {
  const dispatch = useDispatch();

  // Fetch the song data and options (artists, albums, genres) from the store
  const song: Song = useSelector((state: RootState) =>
    state.songs.songs.find((song) => song._id === songId)
  ) as Song;
  const artists = useSelector((state: RootState) => state.artists.artists);
  const albums = useSelector((state: RootState) => state.albums.albums);
  const genres = useSelector((state: RootState) => state.genres.genres);

  // Local state for song details
  const [title, setTitle] = useState<string>(song.title);
  const [imageUrl, setImageUrl] = useState<string>(song.imageUrl);
  const [selectedArtist, setSelectedArtist] = useState<Option | null>();
  const [selectedAlbum, setSelectedAlbum] = useState<Option | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Option | null>(null);

  useEffect(() => {
    if (song) {
      const filteredArtist = artists.find(
        (artist) => artist._id === song.artist?._id
      );

      setSelectedArtist({
        label: filteredArtist?.name ?? "",
        value: filteredArtist?._id ?? "",
      });

      const filteredAlbum = albums.find(
        (album) => album._id === song.album?._id
      );
      setSelectedAlbum({
        label: filteredAlbum?.title ?? "",
        value: filteredAlbum?._id ?? "",
      });
      const filteredGenre = genres.find(
        (genre) => genre?._id === song.genre?._id
      );
      setSelectedGenre({
        label: filteredGenre?.title ?? "",
        value: filteredAlbum?._id ?? "",
      });
    }
  }, [song, artists, albums, genres]);

  useEffect(() => {
    dispatch(fetchArtistsRequest());
    dispatch(fetchAlbumsRequest());
    dispatch(fetchGenresRequest());
  }, [dispatch]);

  const handleSubmit = () => {
    console.log("Viewing data to submit");

    console.log({
      id: songId,
      title,
      imageUrl,
      artistId: selectedArtist?.value,
      albumId: selectedAlbum?.value,
      genreId: selectedGenre?.value,
    });

    dispatch(
      updateSongRequest({
        id: songId,
        title,
        imageUrl,
        artist: selectedArtist?.value,
        album: selectedAlbum?.value,
        genre: selectedGenre?.value,
      })
    );
  };

  return (
    <div css={formContainer}>
      <h2>Edit Song</h2>
      <div css={inputContainer}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          css={inputStyle}
        />
      </div>

      <div css={inputContainer}>
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          css={inputStyle}
        />
      </div>

      <div css={inputContainer}>
        <label>Artist</label>
        <Select
          value={selectedArtist}
          onChange={(artist) => setSelectedArtist(artist)}
          options={artists.map((artist) => ({
            value: artist._id,
            label: artist.name,
          }))}
        />
      </div>

      <div css={inputContainer}>
        <label>Album</label>
        <Select
          value={selectedAlbum}
          onChange={(album) => setSelectedAlbum(album)}
          options={albums.map((album) => ({
            value: album._id,
            label: album.title,
          }))}
        />
      </div>

      <div css={inputContainer}>
        <label>Genre</label>
        <Select
          value={selectedGenre}
          onChange={(genre) => setSelectedGenre(genre)}
          options={genres.map((genre) => ({
            value: genre._id,
            label: genre.title,
          }))}
        />
      </div>

      <button onClick={handleSubmit} css={buttonStyle}>
        Save Changes
      </button>
    </div>
  );
};

// Emotion CSS
const formContainer = css`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const inputContainer = css`
  margin-bottom: 20px;
`;

const inputStyle = css`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const buttonStyle = css`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default EditSong;
