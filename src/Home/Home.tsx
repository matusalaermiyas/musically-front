/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { Box } from "rebass";
import { FC } from "react";
import SongsHomeCard from "../Songs/SongsHomeCard";
import AlbumsHomeCard from "../Albums/AlbumsHomeCard";
import ArtistsHomeCard from "../Artists/ArtistsHomeCard";
import GenresHomeCard from "../Genres/GenresHomeCard";
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
      <SongsHomeCard />
      <AlbumsHomeCard />
      <ArtistsHomeCard />
      <GenresHomeCard />
    </Box>
  );
};

export default LandingPage;
