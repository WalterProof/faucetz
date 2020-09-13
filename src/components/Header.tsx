/** @jsx jsx */
import { Box, Divider, Flex, Heading, Link, jsx } from "theme-ui";
import { ReactComponent as PictoGithub } from "../svg/Octicons-mark-github.svg";
import { ReactComponent as PictoTZ } from "../svg/tz-bold.svg";
import { REPO_URL } from "../config";

function Header() {
    return (
        <Box>
            <Flex>
                <Heading as="h1">Fauce</Heading>
                <PictoTZ />
                <Link
                    href={REPO_URL}
                    sx={{ alignSelf: "center", marginLeft: "auto" }}
                    target="new"
                >
                    <PictoGithub width="30" height="30" />
                </Link>
            </Flex>
            <Divider mb={0} />
        </Box>
    );
}

export default Header;
