/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { Box } from "rebass";
import { FC } from "react";
import SongsCard from "../Songs/SongsCard";
import AlbumsCard from "../Albums/AlbumsCard";
import ArtistsCard from "../Artists/ArtistsCard";
import GenresCard from "../Genres/GenresCard";
import NavBar from "../Navbar/Navbar";
import { globalStyles } from "../styles/styles";

const LandingPage: FC = () => {
  return (
    <Box>
      {/* Global styles to apply the font */}
      <Global styles={globalStyles} />

      {/* Navbar */}
      <NavBar />

      {/* Songs Section */}
      <SongsCard />
      <AlbumsCard />
      <ArtistsCard />
      <GenresCard />
    </Box>
  );
};

export default LandingPage;
