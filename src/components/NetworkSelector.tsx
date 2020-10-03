import React, { useContext } from "react";
import { NetworkContext } from "../Context";
import { Box, Container, Flex, Select } from "theme-ui";
import { NODES } from "../config";

function NetworkSelector() {
  const { network } = useContext(NetworkContext);

  return (
    <Box sx={{ bg: "secondary" }}>
      <Container sx={{ fontSize: 1 }}>
        <Flex px={2} py={1}>
          <Box sx={{ alignSelf: "center", flexGrow: 6 }}>{NODES[network]}</Box>
          <Box sx={{ alignSelf: "center", marginLeft: "auto", flexGrow: 1 }}>
            <NetworkContext.Consumer>
              {({ network, setNetwork }) => (
                <Select
                  defaultValue={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  {Object.keys(NODES).map((network, i) => (
                    <option value={network} key={i}>
                      {network}
                    </option>
                  ))}
                </Select>
              )}
            </NetworkContext.Consumer>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default NetworkSelector;
