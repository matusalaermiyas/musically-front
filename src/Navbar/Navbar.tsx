import { Box, Image, Heading, Flex, Link } from "rebass";
import { linkStyle, navbarStyle } from "../styles/styles";

function NavBar() {
  return (
    <Box>
      <Flex css={navbarStyle}>
        <Link href="/">
          <Flex alignItems="center">
            <Image src="https://via.placeholder.com/50" alt="Musically Logo" />
            <Heading fontSize={4} ml={2}>
              Musically
            </Heading>
          </Flex>
        </Link>

        <Flex alignItems="center">
          <Link href="/songs" css={linkStyle}>
            Songs
          </Link>
          <Link href="#artists" css={linkStyle}>
            Artists
          </Link>
          <Link href="#albums" css={linkStyle}>
            Albums
          </Link>
          <Link href="#genres" css={linkStyle}>
            Genres
          </Link>
          <Link href="/statistics" css={linkStyle}>
            Statistics
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavBar;
