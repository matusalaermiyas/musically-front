import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { fetchArtistsRequest } from "./artistsSlice";
import { Box, Button, Card, Flex, Heading, Image, Text } from "rebass";
import {
  buttonStyle,
  cardStyle,
  contentStyle,
  imageStyle,
  sectionStyle,
} from "../styles/styles";
import { useEffect } from "react";

function ArtistsCard() {
  const dispatch = useDispatch();
  const { artists, loading, error } = useSelector(
    (state: RootState) => state.artists
  );

  useEffect(() => {
    // Dispatch fetch artists action on component mount
    dispatch(fetchArtistsRequest());
  }, [dispatch]);

  return (
    <Box>
      {/* Artists Section */}
      <Box css={sectionStyle} id="artists">
        <Heading fontSize={4}>Top Artists</Heading>
        <Flex css={contentStyle}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            artists.map((artist) => (
              <Card key={artist._id} css={cardStyle}>
                <Image
                  src={artist.imageUrl}
                  css={imageStyle}
                  alt={artist.name}
                />
                <Text fontWeight="bold">{artist.name}</Text>
              </Card>
            ))
          )}
        </Flex>
        <Button css={buttonStyle}>View More Artists</Button>
      </Box>
    </Box>
  );
}

export default ArtistsCard;
