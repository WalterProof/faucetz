/** @jsx jsx */
import { Box, Flex, Spinner, jsx } from "theme-ui";
import DisplayAmount from "./DisplayAmount";

function FaucetAccount(props: any) {
    const { balance, isLoading, pkh, node } = props;

    return isLoading ? (
        <Spinner />
    ) : (
        <Flex
            mb={2}
            px={2}
            sx={{
                alignContent: "center",
                justifyContent: "space-between",
                backgroundColor: "secondary"
            }}
        >
            <Box>{node}</Box>
            <Box>{pkh}</Box>
            <Box>
                <DisplayAmount amount={balance} />
            </Box>
        </Flex>
    );
}

export default FaucetAccount;
