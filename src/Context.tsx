import React from "react";
import Tezos, { TezosWrapper } from "./Tezos";
import { DEFAULT_NETWORK } from "./config";

export const TezosContext = React.createContext({
    tezos: Tezos("https://testnet-tezos.giganode.io/"),
    setTezos: (tezos: TezosWrapper) => {},
    network: DEFAULT_NETWORK,
    setNetwork: (network: string) => {},
});
