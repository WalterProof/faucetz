import { useEffect, useState } from "react";
import { TezosWrapper } from "../Tezos";
import { ConseilTezosDomainsClient } from "@tezos-domains/conseil-client";
import { NODES } from "../config";

export type NetworkType = "florencenet" | "granadanet";

const useTezosDomains = (tezos: TezosWrapper, network: NetworkType) => {
    const [client, setClient] = useState<ConseilTezosDomainsClient | undefined>(
        undefined
    );

    useEffect(() => {
        if (network === "florencenet") return;

        setClient(
            new ConseilTezosDomainsClient({
                conseil: { server: NODES.network },
                network: network,
                caching: { enabled: true },
            })
        );
    }, [tezos, network]);

    return [client];
};

export default useTezosDomains;
