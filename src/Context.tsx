import React from "react";

export const NetworkContext = React.createContext({
    network: "",
    setNetwork: (network: string) => {},
});
