/** @jsx jsx */
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, Flex, Heading, jsx } from "theme-ui";
import { ReactComponent as PictoTZ } from "../svg/tz-bold.svg";
import NetworkSelector from "./NetworkSelector";

function Header() {
  return (
    <Box>
      <NetworkSelector />
      <Container>
        <Flex>
          <Flex>
            <Heading as="h1">Fauce</Heading>
            <PictoTZ />
          </Flex>
          <Flex as="nav" sx={{ alignItems: "center", marginLeft: "auto" }}>
            <RouterLink to="/" sx={{ variant: "styles.navlink" }}>
              Faucet
            </RouterLink>
            <RouterLink
              to="/account-generator"
              sx={{ variant: "styles.navlink", marginLeft: 3 }}
            >
              Account Generator
            </RouterLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
