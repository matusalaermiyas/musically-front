/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStatisticsRequest } from "./statisticsSlice";
import { RootState } from "../store/configureStore";
import { Box, Heading, Text, Card } from "rebass";
import { css, Global } from "@emotion/react";
import NavBar from "../Navbar/Navbar";
import { globalStyles } from "../styles/styles";

const cardStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const headingText = css`
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-align: center;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 40px auto;
  max-width: 800px;
`;

const bottomGridStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 40px auto;
  max-width: 1200px;
`;

const sectionStyle = css`
  margin: 20px 40px;
`;

const StatisticsSection = () => {
  const dispatch = useDispatch();
  const { statistics, loading, error } = useSelector(
    (state: RootState) => state.statistcs
  );

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  return (
    <Box>
      <Global styles={globalStyles} />

      {/* Navbar */}
      <NavBar />

      <Box css={sectionStyle}>
        <Heading fontSize={4} textAlign="center" css={headingText}>
          Statistics
        </Heading>
        {loading ? (
          <Text textAlign="center">Loading...</Text>
        ) : error ? (
          <Text textAlign="center" color="red">
            Error: {error}
          </Text>
        ) : (
          <>
            {/* Top Section - Total Info Cards */}
            <Box css={gridStyle}>
              <Card css={cardStyle}>
                <Text fontWeight="bold">Total Genres</Text>
                <Text>{statistics.totalGenres}</Text>
              </Card>
              <Card css={cardStyle}>
                <Text fontWeight="bold">Total Songs</Text>
                <Text>{statistics.totalSongs}</Text>
              </Card>
              <Card css={cardStyle}>
                <Text fontWeight="bold">Total Albums</Text>
                <Text> {statistics.totalAlbums}</Text>
              </Card>
              <Card css={cardStyle}>
                <Text fontWeight="bold">Total Artists</Text>
                <Text>{statistics.totalArtists}</Text>
              </Card>
            </Box>
            {/* Bottom Section - Genre, Artist, Album */}
            <Box css={bottomGridStyle}>
              {/* Songs in Each Genre */}
              <Box>
                <Heading fontSize={3} css={headingText}>
                  Songs in Each Genre
                </Heading>
                {statistics.totalSongsInGenre.map((genre) => (
                  <Box key={genre.genre} css={cardStyle} marginY="10px">
                    <Text fontWeight="bold">{genre.genre}</Text>
                    <Text>{genre.totalSongs} songs</Text>
                  </Box>
                ))}
              </Box>
              {/* Songs & Albums per Artist */}
              <Box>
                <Heading fontSize={3} css={headingText}>
                  Songs & Albums per Artist
                </Heading>
                {statistics.totalSongsAndAlbumsForArtist.map((artist) => (
                  <Box key={artist.artist} css={cardStyle} marginY="10px">
                    <Text fontWeight="bold">{artist.artist}</Text>
                    <Text>{artist.totalSongs} songs</Text>
                    <Text>{artist.totalAlbums} albums</Text>
                  </Box>
                ))}
              </Box>
              {/* Songs per Album */}
              <Box>
                <Heading fontSize={3} css={headingText}>
                  Songs per Album
                </Heading>
                {statistics.totalSongsForAlbum.map((album) => (
                  <Box key={album.album} css={cardStyle} marginY="10px">
                    <Text fontWeight="bold">{album.album}</Text>
                    <Text>{album.totalSongs} songs</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default StatisticsSection;
