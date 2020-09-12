import React from "react";
import { Text, Spinner } from "theme-ui";
import DisplayAmount from "./DisplayAmount";

function FaucetAccount(props: any) {
    const { balance, isLoading, pkh } = props;

    return isLoading ? (
        <Spinner />
    ) : (
        <Text my={2}>
            The configured faucet account's address is {pkh} and its current
            balance is <DisplayAmount amount={balance} />
        </Text>
    );
}

export default FaucetAccount;
