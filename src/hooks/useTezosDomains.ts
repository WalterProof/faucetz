import { useEffect, useState } from "react";
import { TezosDomainsClient } from "@tezos-domains/client";
import { TezosWrapper } from "../Tezos";

export type NetworkType = "carthagenet" | "delphinet" | "dalphanet" | undefined;

const useTezosDomains = (tezos: TezosWrapper, network: NetworkType) => {
    const [client, setClient] = useState<TezosDomainsClient | undefined>(
        undefined
    );

    useEffect(() => {
        if (network === undefined || network === "dalphanet") return;
        setClient(new TezosDomainsClient({ tezos: tezos.getTK(), network }));
    }, [tezos, network]);

    return [client];
};

export default useTezosDomains;
