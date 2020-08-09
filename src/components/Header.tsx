/** @jsx jsx */
import React, { useState } from "react";
import { Box, Flex, Heading, Select, jsx } from "theme-ui";
import FaucetAccount from "./FaucetAccount";

import useFaucet, { NODES } from "../useFaucet";

function Header(props: any) {
    const [node, setNode] = useState(NODES.carthagenet);
    const { isLoading, pkh, balance } = useFaucet(node, props.balanceRefresh);

    function updateNetwork(e: React.FormEvent<HTMLSelectElement>) {
        setNode(NODES[e.currentTarget.value]);
    }

    return (
        <Flex
            sx={{
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Heading as="h1">FauceTZ</Heading>
            <Box sx={{ flexGrow: 2 }} p={4}>
                <Select defaultValue="carthagenet" onChange={updateNetwork}>
                    <option>carthagenet</option>
                    <option>dalphanet</option>
                </Select>
            </Box>

            <Box>
                <FaucetAccount
                    balance={balance}
                    isLoading={isLoading}
                    pkh={pkh}
                    node={node}
                />
            </Box>
        </Flex>
    );
}

export default Header;
