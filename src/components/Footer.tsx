import React from "react";
import { ReactComponent as PictoGithub } from "../svg/Octicons-mark-github.svg";
import { Box, Container, Flex, Link } from "theme-ui";
import { REPO_URL } from "../config";

function Footer() {
  return (
    <footer>
      <Box sx={{ bg: "secondary" }}>
        <Container>
          <Flex px={4} py={3}>
            <Link
              href={REPO_URL}
              sx={{ alignSelf: "center", marginLeft: "auto" }}
              target="new"
            >
              <PictoGithub width="30" height="30" />
            </Link>
          </Flex>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
