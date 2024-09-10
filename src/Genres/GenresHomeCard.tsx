import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { useEffect } from "react";
import { fetchGenresRequest } from "./genresSlice";
import { Box, Button, Card, Flex, Heading, Text } from "rebass";
import {
  buttonStyle,
  cardStyle,
  contentStyle,
  sectionStyle,
} from "../styles/styles";

function GenresHomeCard() {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector(
    (state: RootState) => state.genres
  );

  useEffect(() => {
    // Dispatch fetch genres action on component mount
    dispatch(fetchGenresRequest());
  }, [dispatch]);

  return (
    <Box>
      {/* Genres Section */}
      <Box css={sectionStyle} id="genres">
        <Heading fontSize={4}>Genres</Heading>
        <Flex css={contentStyle}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            genres.map((genre) => (
              <Card key={genre._id} css={cardStyle}>
                <Text fontWeight="bold">{genre.title}</Text>
              </Card>
            ))
          )}
        </Flex>
        <Button css={buttonStyle}>View More Genres</Button>
      </Box>
    </Box>
  );
}

export default GenresHomeCard;
