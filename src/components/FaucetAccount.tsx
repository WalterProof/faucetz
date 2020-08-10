/** @jsx jsx */
import { Box, Flex, Text, Spinner, jsx } from "theme-ui";
import Amount from "./Amount";

function FaucetAccount(props: any) {
    const { balance, isLoading, node, pkh } = props;

    return isLoading ? (
        <Spinner />
    ) : (
        <Flex>
            <Box>
                <Text sx={{ fontSize: 1, color: "secondary" }}>
                    {pkh}
                    <br />
                    {node}
                </Text>
            </Box>
            <Box pl={4}>
                <Amount amount={balance} />
            </Box>
        </Flex>
    );
}

export default FaucetAccount;
