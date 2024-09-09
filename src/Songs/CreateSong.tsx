/** @jsxImportSource @emotion/react */
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { RootState } from "../store/configureStore";
import { fetchAlbumsRequest } from "../Albums/albumsSlice";
import { fetchArtistsRequest } from "../Artists/artistsSlice";
import { fetchGenresRequest } from "../Genres/genresSlice";
import { createSongRequest } from "./songsSlice";
import { formStyles } from "./styles";

interface Option {
  value: string;
  label: string;
}

const SongCreationForm: React.FC = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const artists = useSelector((state: RootState) => state.artists.artists);
  const genres = useSelector((state: RootState) => state.genres.genres);

  useEffect(() => {
    dispatch(fetchArtistsRequest()); // Fetch artists from store
    dispatch(fetchGenresRequest()); // Fetch genres from store
    dispatch(fetchAlbumsRequest()); // Fetch genres from store
  }, [dispatch]);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<Option | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Option | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Option | null>(null);

  const [newAlbum, setNewAlbum] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [albumImageUrl, setAlbumImageUrl] = useState("");
  const [artistImageUrl, setArtistImageUrl] = useState("");

  const [isNewAlbum, setIsNewAlbum] = useState(false);
  const [isNewArtist, setIsNewArtist] = useState(false);
  const [isNewGenre, setIsNewGenre] = useState(false);

  const handleCreateSong = (event: FormEvent) => {
    event.preventDefault();

    const songData = {
      title,
      imageUrl,
      album: isNewAlbum
        ? { name: newAlbum, imageUrl: albumImageUrl }
        : selectedAlbum,
      isNewAlbum,
      artist: isNewArtist
        ? { name: newArtist, imageUrl: artistImageUrl }
        : selectedArtist,
      isNewArtist,
      genre: isNewGenre ? newGenre : selectedGenre,
      isNewGenre,
    };

    console.log("Viewing song data");
    console.log(songData);

    dispatch(createSongRequest(songData));
  };

  return (
    <form css={formStyles} onSubmit={handleCreateSong}>
      <label>Song Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Image Url</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <label>Artist</label>
      {isNewArtist ? (
        <>
          <input
            type="text"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
            placeholder="New Artist Name"
            required
          />
          <input
            type="text"
            value={artistImageUrl}
            onChange={(e) => setArtistImageUrl(e.target.value)}
            placeholder="Artist Image URL"
          />
        </>
      ) : (
        <Select
          options={artists.map((artist) => ({
            value: artist._id,
            label: artist.name,
          }))}
          onChange={setSelectedArtist}
          placeholder="Select Artist"
        />
      )}
      <label>
        <input
          type="checkbox"
          checked={isNewArtist}
          onChange={() => setIsNewArtist(!isNewArtist)}
        />
        Create New Artist
      </label>

      <label>Album</label>
      {isNewAlbum ? (
        <>
          <input
            type="text"
            value={newAlbum}
            onChange={(e) => setNewAlbum(e.target.value)}
            placeholder="New Album Name"
            required
          />
          <input
            type="text"
            value={albumImageUrl}
            onChange={(e) => setAlbumImageUrl(e.target.value)}
            placeholder="Album Image URL"
          />
        </>
      ) : (
        <Select
          options={albums.map((album) => ({
            value: album._id,
            label: album.title,
          }))}
          onChange={setSelectedAlbum}
          placeholder="Select Album"
        />
      )}
      <label>
        <input
          type="checkbox"
          checked={isNewAlbum}
          onChange={() => setIsNewAlbum(!isNewAlbum)}
        />
        Create New Album
      </label>

      <label>Genre</label>
      {isNewGenre ? (
        <input
          type="text"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          placeholder="New Genre"
          required
        />
      ) : (
        <Select
          options={genres.map((genre) => ({
            value: genre._id,
            label: genre.title,
          }))}
          onChange={setSelectedGenre}
          placeholder="Select Genre"
        />
      )}
      <label>
        <input
          type="checkbox"
          checked={isNewGenre}
          onChange={() => setIsNewGenre(!isNewGenre)}
        />
        Create New Genre
      </label>

      <button>Create Song</button>
    </form>
  );
};

export default SongCreationForm;
