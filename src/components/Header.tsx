/** @jsx jsx */
import React, { useState } from "react";
import { Alert, Box, Flex, Heading, Select, jsx } from "theme-ui";
import FaucetAccount from "./FaucetAccount";
import { ReactComponent as PictoTZ } from "../svg/tz-bold.svg";

import useFaucet, { NODES } from "../useFaucet";

function Header(props: any) {
    const [node, setNode] = useState(NODES.carthagenet);
    const { isLoading, pkh, balance, error } = useFaucet(
        node,
        props.balanceRefresh
    );

    function updateNetwork(e: React.FormEvent<HTMLSelectElement>) {
        setNode(NODES[e.currentTarget.value]);
    }

    return (
        <div>
            {error && <Alert my={2}>{error}</Alert>}
            <Flex
                sx={{
                    flexDirection: ["column", "row"],
                    justifyContent: "space-between",
                    alignItems: ["stretch", "center"]
                }}
            >
                <Flex
                    sx={{
                        alignItems: "center",
                        flexGrow: 1
                    }}
                >
                    <Flex>
                        <Heading as="h1">Fauce</Heading>
                        <PictoTZ />
                    </Flex>
                    <Box sx={{ flexGrow: 1 }} pl={[5, 3]}>
                        <Select
                            defaultValue="carthagenet"
                            onChange={updateNetwork}
                        >
                            {Object.keys(NODES).map(network => (
                                <option>{network}</option>
                            ))}
                        </Select>
                    </Box>
                </Flex>

                <Flex>
                    <Box pl={[0, 3]} py={[3, 0]}>
                        <FaucetAccount
                            balance={balance}
                            isLoading={isLoading}
                            pkh={pkh}
                            node={node}
                        />
                    </Box>
                </Flex>
            </Flex>
        </div>
    );
}

export default Header;
