/** @jsx jsx */
import { Box, Flex, Heading, Spinner, jsx } from "theme-ui";

import faucet from "../tz1KxuxXF1xu2dH7pkPQaJrUoBbLn8SsijWG.json";
import useFaucet from "../useFaucet";

function Header() {
    const { isLoading, pkh, balance } = useFaucet(
        "https://testnet-tezos.giganode.io",
        faucet.email,
        faucet.password,
        faucet.mnemonic.join(" "),
        faucet.secret
    );

    return (
        <Flex
            sx={{
                alignItems: "center",
                justifyContent: "space-between",
                my: 4
            }}
        >
            <Heading as="h1">FauceTZ</Heading>
            <Box sx={{ color: "secondary" }}>[ {pkh} ]</Box>
            <Box>{isLoading ? <Spinner /> : balance}</Box>
        </Flex>
    );
}

export default Header;
