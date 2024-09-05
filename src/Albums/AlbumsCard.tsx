import { useDispatch, useSelector } from "react-redux";
import {
  buttonStyle,
  cardStyle,
  contentStyle,
  imageStyle,
  sectionStyle,
} from "../styles/styles";
import { Box, Card, Image, Text, Button, Heading, Flex } from "rebass";
import { RootState } from "../store/configureStore";
import { useEffect } from "react";
import { fetchAlbumsRequest } from "./albumsSlice";

function AlbumsCard() {
  const dispatch = useDispatch();
  const { albums, loading, error } = useSelector(
    (state: RootState) => state.albums
  );

  useEffect(() => {
    // Dispatch fetch albums action on component mount
    dispatch(fetchAlbumsRequest());
  }, [dispatch]);

  return (
    <Box>
      {/* Albums Section */}
      <Box css={sectionStyle} id="albums">
        <Heading fontSize={4}>Featured Albums</Heading>
        <Flex css={contentStyle}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            albums.map((album) => (
              <Card key={album._id} css={cardStyle}>
                <Image
                  src={album.imageUrl}
                  css={imageStyle}
                  alt={album.title}
                />
                <Text fontWeight="bold">{album.title}</Text>
                <Text>{album.artist}</Text>
              </Card>
            ))
          )}
        </Flex>
        <Button css={buttonStyle}>View More Albums</Button>
      </Box>
    </Box>
  );
}

export default AlbumsCard;
