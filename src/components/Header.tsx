import React from "react";
import { Box, Divider, Flex, Heading } from "theme-ui";
import { ReactComponent as PictoTZ } from "../svg/tz-bold.svg";

function Header(props: any) {
    return (
        <Box>
            <Flex>
                <Heading as="h1">Fauce</Heading>
                <PictoTZ />
            </Flex>
            <Divider />
        </Box>
    );
}

export default Header;
