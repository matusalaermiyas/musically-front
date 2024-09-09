import { Box, Heading, Flex } from "rebass";
import { StyledLink, navbarStyle } from "../styles/styles";

function NavBar() {
  return (
    <Box>
      <Flex css={navbarStyle}>
        <StyledLink to="/">
          <Flex alignItems="center">
            {/* <Image src="https://via.placeholder.com/50" alt="Musically Logo" /> */}
            <Heading fontSize={4} ml={2}>
              Musically
            </Heading>
          </Flex>
        </StyledLink>

        <Flex alignItems="center">
          <StyledLink to="/songs">Songs</StyledLink>
          <StyledLink to="#artists">Artists</StyledLink>
          <StyledLink to="#albums">Albums</StyledLink>
          <StyledLink to="#genres">Genres</StyledLink>
          <StyledLink to="/statistics">Statistics</StyledLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavBar;
