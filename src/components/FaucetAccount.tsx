/** @jsx jsx */
import { Box, Spinner, jsx } from "theme-ui";
import DisplayAmount from "./DisplayAmount";

function FaucetAccount(props: any) {
    const { balance, isLoading, pkh, node } = props;

    return isLoading ? (
        <Spinner />
    ) : (
        <Box my={2}>
            <ul>
                <li>{node}</li>
                <li>{pkh}</li>
                <li>
                    <DisplayAmount amount={balance} />
                </li>
            </ul>
        </Box>
    );
}

export default FaucetAccount;
