import { RootState } from "../store/configureStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsRequest } from "./songsSlice";
import { Box, Button, Card, Flex, Heading, Image, Text } from "rebass";
import {
  buttonStyle,
  cardStyle,
  contentStyle,
  imageStyle,
  sectionStyle,
} from "../styles/styles";
import { useNavigate } from "react-router-dom";

function SongsCard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { error, loading, songs } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    // Dispatch fetch songs action on component mount
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleManageSongs = () => {
    return navigate("/songs");
  };

  return (
    <Box>
      {/* Songs Section */}
      <Box css={sectionStyle} id="songs">
        <Heading fontSize={4}>Featured Songs</Heading>
        <Flex css={contentStyle}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            songs.map((song) => (
              <Card key={song._id} css={cardStyle}>
                <Image src={song.imageUrl} css={imageStyle} alt={song.title} />
                <Text fontWeight="bold">{song.title}</Text>
                <Text>{song.artist.name}</Text>
              </Card>
            ))
          )}
        </Flex>
        <Button css={buttonStyle} onClick={handleManageSongs}>
          Manage Songs
        </Button>
      </Box>
    </Box>
  );
}

export default SongsCard;
