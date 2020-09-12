/** @jsx jsx */
import React, { useState } from "react";
import { Alert, Box, Heading, Select, jsx } from "theme-ui";
import FaucetAccount from "./FaucetAccount";
import useFaucet, { NODES } from "../useFaucet";

function Network(props: any) {
    const [node, setNode] = useState(NODES.carthagenet);
    const { isLoading, pkh, balance, error } = useFaucet(
        node,
        props.balanceRefresh
    );

    function updateNetwork(e: React.FormEvent<HTMLSelectElement>) {
        setNode(NODES[e.currentTarget.value]);
    }

    return (
        <Box>
            <Heading as="h2" my={2}>
                Select a network
            </Heading>
            {error && <Alert my={2}>{error}</Alert>}
            <Select defaultValue="carthagenet" onChange={updateNetwork}>
                {Object.keys(NODES).map(network => (
                    <option value={network}>
                        {network} ({NODES[network]})
                    </option>
                ))}
            </Select>
            <FaucetAccount
                balance={balance}
                isLoading={isLoading}
                pkh={pkh}
                node={node}
            />
        </Box>
    );
}

export default Network;
