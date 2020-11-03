import { useState } from "react";
import { TezosDomainsClient } from "@tezos-domains/client";
import { TezosToolkit } from "@taquito/taquito";
import { useEffect } from "react";
import { NODES } from "../config";

export type NetworkType = "carthagenet" | "delphinet" | "dalphanet" | undefined;

const useTDC = (network: NetworkType) => {
    const [client, setClient] = useState<TezosDomainsClient | undefined>(
        undefined
    );

    useEffect(() => {
        if (network === undefined || network === "dalphanet") return;
        const rpc = NODES[network];
        const tezos = new TezosToolkit();
        tezos.setProvider({ rpc });
        setClient(new TezosDomainsClient({ tezos, network }));
    }, [network]);

    return [client];
};

export default useTDC;
